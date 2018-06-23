/**
 * Created by HULL on 2017/2/10.
 * 声音审核界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAuditMusicData,getCheckMusicData,fetchAuditMusicSearchResult,fetchCheckMusicSearchResult} from '../../actions/MusicStoreAction';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router'
import {Table, Button, Popconfirm, Input, Modal,Spin} from 'antd';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
const Search = Input.Search;

class MusicCheckListContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      onPressBtn:false //用于判断是否点击待审核或已通过按钮
    };
  }

  componentDidMount(){
    const{dispatch}=this.props;
    if(localStorage.getItem("role")=='topVerifier'){
      dispatch(getAuditMusicData('待审核'));
    }else {
      dispatch(getCheckMusicData('待审核',localStorage.getItem("userId")));
    }
  }

//审核方法
  /*在审核声音内  点击审核按钮操作
  * 一级审核人员登录：只有在待审核内有审核声音操作
  * 二级审核人员登录：在待审核或未通过内，都可查看审核详情。点击审核按钮进入，可通过或未通过该声音
  * */
  onPressAudit(record){
    const {router}=this.props;
    if(localStorage.getItem("role")=='topVerifier'){
      router.push({
        pathname:'SecondCheckPanelPage',
        state:{MusicData:record}
      })
    }else if(localStorage.getItem("role")=='verifier' && !this.state.onPressBtn){
      router.push({
        pathname:'MusicCheckPage',
        state:{MusicData:record}
      });
    }else {
      alert('您暂无此操作权限!')
    }
  }

  onPressNoCheck(){
    this.setState({onPressBtn:false});
    const{dispatch}=this.props;
    if(localStorage.getItem("role")=='topVerifier'){
      dispatch(getAuditMusicData('待审核'));
    }else {
      dispatch(getCheckMusicData('待审核',localStorage.getItem("userId")));
    }
  }

  /*审核声音内 点击未通过按钮操作
  * 一级审核人员登录：该界面显示的都是一级审核人员本人未通过声音，不能再次重审
  * 二级审核人员登录：该界面显示的是一级审核人员未通过声音，可再次重审（自己可选择该声音通过或未通过）
  * */
  onPressNotPass(){
    this.setState({onPressBtn:true});
    const{dispatch}=this.props;
    dispatch(getAuditMusicData('未通过'));
  }

  handleSearch(value){
    const{dispatch}=this.props;
    var status='待审核';
    if (this.state.onPressBtn){
      status='未通过';
    }
    if(localStorage.getItem("role")=='topVerifier'){
      dispatch(fetchAuditMusicSearchResult(status,value));
    }else {
      if (this.state.onPressBtn){
        dispatch(fetchAuditMusicSearchResult(status,value));
      }else {
        dispatch(fetchCheckMusicSearchResult(status,localStorage.getItem("userId"),value));
      }
    }
  }

  backSceneType(){
    hashHistory.push("MusicContainer");
  }

  render() {
    const {musicstore} = this.props;
    const columns = [
      {title: '编号', dataIndex: 'id', key:'id', className:"columns",
        render: (text, record, index) => {
          return(
              <div><text>{index+1}</text></div>
          )
        }
      },{title:'声音名称', dataIndex: 'name', key:'song', className:"columns"},
      {title: '歌手', dataIndex: 'singer', key:'singer', className:"columns"},
      {title: '歌词', dataIndex: 'lyric', key:'lyric', className:"columns"},
      {title: '时间', dataIndex: 'duration', key:'duration', className:"columns"},
      {title: '描述', dataIndex: 'describe', key:'describe', className:"columns"},
      {title: '情景名称', dataIndex: 'sceneName', key:'sceneName', className:"columns"},
      {title: '图片', dataIndex: 'soundImg', key:'img', className:"columns",
        render: (text, record, index) => {
          const imgUrl=GlobalVariable.IP+record.soundImg;
          return(
              <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
          )
        }
      },{title: '类型', dataIndex: 'type', key:'type', className:"columns"},
      {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
        render: (text, record, index) => {
          return (
              <div>
                <a style={{backgroundColor:'none',paddingLeft:10}} onClick={() => this.onPressAudit(record,index)}>审核</a>
              </div>
          );
        }
      }
    ];
    if (musicstore.fetchedStoreMusic==false){
      return(
          <div style={{marginTop:'40%',textAlign:'center'}}>
            <Spin size="large" />
          </div>
      )
    }else {
      return (
          <div >
            <div className='module_header'>
              <div className='title'>
                <a onClick={this.backSceneType.bind(this)}>声库</a><a>-</a><span>审核声音</span>
              </div>
              <div className="module_button">
                <Search
                    placeholder="请输入搜索内容"
                    style={{ width: 300,paddingLeft:30 }}
                    onSearch={this.handleSearch.bind(this)}
                />
                <div className="editable-add-btn">
                  <Button type="ghost" onClick={this.onPressNoCheck.bind(this)}>待审核</Button>
                  <Button type="ghost" onClick={this.onPressNotPass.bind(this)}>未通过</Button>
                </div>
              </div>
            </div>
            <div className="module_content">
              <Table
                  bordered
                  rowKey="id"
                  dataSource={musicstore.StoreMusicList}
                  columns={columns} />
            </div>
          </div>
      )
    }
  }
}

function mapStateToProps(state) {
  const {musicstore} = state;
  return {
    musicstore
  }
}
export default connect(mapStateToProps)(MusicCheckListContainer);
