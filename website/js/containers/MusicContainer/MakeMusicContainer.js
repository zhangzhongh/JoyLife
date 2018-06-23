/**
 * Created by HULL on 2017/2/9.
 * 声音创客
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMakeMusicData, DeleteMakeMusic,setModalVisible,fetchMakerMusicSearchResult,UpdateMusic} from '../../actions/MusicStoreAction';
import '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router';
import {Table, Button, Popconfirm, Input, Modal,Spin,message} from 'antd';
import {__musicAudition__} from '../../utils/common';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
import EditableCell from '../../components/EditableCell';
const Search = Input.Search;

class MakeMusicContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(getMakeMusicData(this.props.location.state.userId));
    }

    /*
     * 试听方法
     * */
    onPressAudition(record){
        return __musicAudition__(record.singer,
            record.name,
            record.uploadDir);
    }

    //点击取消关闭对话框
    handleCancel(e) {
        const{dispatch}=this.props;
        dispatch(setModalVisible(false));
        dispatch(getMakeMusicData(this.props.location.state.userId));
    }

    /*
     * 删除操作功能方法
     * */
    onDelete(record,index){
        const{dispatch}=this.props;
        dispatch(DeleteMakeMusic(this.props.location.state.userId,record.id));
    }

    /*
     * 回到一级菜单界面方法
     * */
    backMusicStore(){
        hashHistory.push("MakerContainer");
    }

    handleSearch(value){
        const{dispatch}=this.props;
        dispatch(fetchMakerMusicSearchResult(this.props.location.state.userId,value));
    }

    onCellChange(params,record){
        const{dispatch}=this.props;
        if(localStorage.getItem("role")=='admin' || localStorage.getItem("role")=='manager'){
            const {dispatch}=this.props;
            dispatch(UpdateMusic(record.id,params))
        }else {
            dispatch(getMakeMusicData(this.props.location.state.userId));
            message.warning('对不起，您没有编辑权限，请示管理员或超级管理员操作此功能');
        }
    }

    /*
     * <div className='module_button'>
     <Button style={{float:'right'}} type="ghost" onClick={this.handleAdd.bind(this)}>增加声音</Button>
     </div>
     * */

    render() {
        const {musicstore} = this.props;
        const columns= [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },
            {title: '声音创客', dataIndex: 'name', key:'name', className:"columns",
                render: (text, record, index) => {
                    return (
                        <EditableCell
                            value={text}
                            onChange={(value) => this.onCellChange({name:value},record)}
                        />
                    )
                }
            },
            {title: '歌手', dataIndex: 'singer', key:'singer', className:"columns"},
            {title: '时间', dataIndex: 'duration', key:'duration', className:"columns"},
            {title: '描述', dataIndex: 'describe', key:'describe', className:"columns",
                render: (text, record, index) => {
                    return (
                        <EditableCell
                            value={text}
                            onChange={(value) => this.onCellChange({describe:value},record)}
                        />
                    )
                }
            },
            {title: '图片', dataIndex: 'soundImg', key:'soundImg', className:"columns",
                render: (text, record, index) => {
                    const imgUrl=GlobalVariable.IP+record.soundImg;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }
            },
            {title: '审核状态', dataIndex: 'auditStatus', key:'auditStatus', className:"columns"},
            {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <span>
                          <Popconfirm title="确定删除此数据吗?" className='delete' onConfirm={() => this.onDelete(record,index)}>
                              <a href="#">删除</a>
                          </Popconfirm>
                            <a style={{backgroundColor:'none',paddingLeft:10}} onClick={() => this.onPressAudition(record)}>试听</a>
                        </span>
                    )
                }
            }
        ];

        if (musicstore.fetched==false){
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
                            <a>声库</a><a>-</a>
                            <a onClick={this.backMusicStore.bind(this)}>声音创客</a><a>-</a><span>声音</span>
                        </div>
                        <div className='module_button'>
                            <Search
                                placeholder="请输入搜索内容"
                                style={{ width: 300,paddingLeft:30 }}
                                onSearch={this.handleSearch.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            columns={columns}
                            dataSource={musicstore.MusicStoreData}
                        />
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
export default connect(mapStateToProps)(MakeMusicContainer);
