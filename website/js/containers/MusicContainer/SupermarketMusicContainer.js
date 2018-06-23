/**
 * Created by HULL on 2017/2/9.
 * 声音超市 列表界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSupermarketMusicData,DeleteSupermarketMusic,setModalVisible,fetchSupermarketMusicSearchResult,UpdateMusic} from '../../actions/MusicStoreAction';
import '../RoomMaintenance/RoomMaintenanceList.css';
import AddSuperMusicPage from './AddSuperMusicPage';
import { hashHistory } from 'react-router';
import {Table, Button, Popconfirm, Input,Modal,Spin,message} from 'antd';
import {__musicAudition__,musicIp} from '../../utils/common';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
import EditableCell from '../../components/EditableCell';
import AddSongsList from '../RoomMaintenance/AddSongsList';
const Search = Input.Search;

class SupermarketMusicContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false
        }
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(getSupermarketMusicData('声音超市'));
    }

    /*
     * 试听方法
     * */
    onPressAudition(record){
        return __musicAudition__(record.singer,
            record.name,
            record.uploadDir
            /*"http://61.158.153.201/hwhtest/public/files/111.mp3"*/);
    }

    /*
     * 添加方法
     * */
    handleAdd (){
        if(localStorage.getItem("role")=='uploader'){
            const{dispatch}=this.props;
            dispatch(setModalVisible(true));
        }else if(localStorage.getItem("role")=='manager' || localStorage.getItem("role")=='admin'){
            this.setState({ visible: true });
        }else{
            message.warning('您暂无此操作权限!请示管理员或超级管理员或上传者操作此功能');
        }
    }

    //点击取消关闭对话框
    handleClose() {
        const{dispatch}=this.props;
        dispatch(getSupermarketMusicData('声音超市'));
        this.setState({ visible: false });
    }

    handleSearch(value){
        const{dispatch}=this.props;
        dispatch(fetchSupermarketMusicSearchResult('声音超市',value));
    }

    //点击取消关闭对话框
    handleCancel(e) {
        const{dispatch}=this.props;
        dispatch(setModalVisible(false));
        dispatch(getSupermarketMusicData('声音超市'));
    }

    /*
     * 删除操作功能方法
     * */
    onDelete(record,index){
        const{dispatch}=this.props;
        dispatch(DeleteSupermarketMusic('声音超市',record.id));
    }

    /*
     * 回到一级菜单界面方法
     * */
    backMusicStore(){
        hashHistory.push("MusicContainer");
    }

    onCellChange(params,record){
        const{dispatch}=this.props;
        if(localStorage.getItem("role")=='admin' || localStorage.getItem("role")=='manager'){
            const {dispatch}=this.props;
            dispatch(UpdateMusic(record.id,params))
        }else {
            dispatch(getSupermarketMusicData('声音超市'));
            message.warning('对不起，您没有编辑权限，请示管理员或超级管理员操作此功能');
        }
    }

    render() {
        const columns = [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },
            {title: '声音超市', dataIndex: 'name', key:'name', className:"columns",
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

                    );
                }
            }
        ];
        const {musicstore} = this.props;
        const SceneId=6;
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
                            <a onClick={this.backMusicStore.bind(this)}>声库</a><a>-</a><span>声音超市</span>
                        </div>
                        <div className='module_button'>
                            <Search
                                placeholder="请输入搜索内容"
                                style={{ width: 300,paddingLeft:30 }}
                                onSearch={this.handleSearch.bind(this)}
                            />
                            <Button style={{float:'right'}} type="ghost" onClick={this.handleAdd.bind(this)}>增加声音</Button>
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
                    <div>
                        <Modal title="增加声音" visible={musicstore.ModalVisible}
                               onCancel={this.handleCancel.bind(this)}
                               footer={null} style={{ top: 40 }}>
                            <div style={{height:600}}>
                                <AddSuperMusicPage SceneName={'声音超市'} sceneId={SceneId}/>
                            </div>
                        </Modal>
                    </div>
                    <div>
                        <Modal title="声音列表" visible={this.state.visible}
                               onCancel={this.handleClose.bind(this)} footer={null}
                        >
                            <AddSongsList SceneId={SceneId} SceneName={'声音超市'} Remark={1}/>
                        </Modal>
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
export default connect(mapStateToProps)(SupermarketMusicContainer);

