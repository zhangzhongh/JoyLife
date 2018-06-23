/**
 * Created by HULL on 2017/2/10.
 * 推荐歌曲内的 声音列表界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMusicOfSceneData,DeleteMusic,setModalVisible,fetchSceneMusicSearchResult,UpdateMusic} from '../../actions/MusicStoreAction';
import {fetchSongs} from '../../actions/MusicOfRoomActions';//测试使用，待删除
import  '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router'
import UploadMusicPage from './UploadMusicPage';
import {Table, Button, Popconfirm,notification,Modal,Spin,Input,message} from 'antd';
import {__musicAudition__} from '../../utils/common';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
import EditableCell from '../../components/EditableCell';
import AddSongsList from '../RoomMaintenance/AddSongsList';
const Search = Input.Search;
var SceneId;

class MusicListPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible: false
        }
    }

    componentDidMount(){
        SceneId=this.props.location.state.SceneData.id;
        const{dispatch}=this.props;
        dispatch(getMusicOfSceneData(SceneId));//查询条件：所属情景id，状态
    }

    /*
     * 试听方法
     * */
    onPressAudition(record){
        return __musicAudition__(record.singer,
                                record.name,
                                record.uploadDir
                              /*  "http://61.158.153.201/hwhtest/public/files/111.mp3"*/);
    }

    //点击取消关闭对话框
    handleCancel(e) {
        const{dispatch}=this.props;
        dispatch(setModalVisible(false));
        dispatch(getMusicOfSceneData(SceneId));//查询条件：所属情景id，状态
    }

    //点击取消关闭对话框
    handleClose() {
        const{dispatch}=this.props;
        dispatch(getMusicOfSceneData(SceneId));
        this.setState({ visible: false });
    }

    /*
     * 添加方法
     * */
   AddOnPress(){
       if(localStorage.getItem("role")=='uploader'){
           const{dispatch}=this.props;
           dispatch(setModalVisible(true));
       }else if(localStorage.getItem("role")=='manager' || localStorage.getItem("role")=='admin'){
           this.setState({ visible: true });
       }else{
           message.warning('您暂无此操作权限!请示管理员或超级管理员或上传者操作此功能');
       }
    }

    /*
     * 删除操作功能方法
     * */
    onDelete(record,index){
        const{dispatch}=this.props;
        dispatch(DeleteMusic(record.sceneId,record.id));
    }

    handleSearch(value){
        const{dispatch}=this.props;
        dispatch(fetchSceneMusicSearchResult(SceneId,value));
    }

    onCellChange(params,record){
        const{dispatch}=this.props;
        if(localStorage.getItem("role")=='admin' || localStorage.getItem("role")=='manager'){
            const {dispatch}=this.props;
            dispatch(UpdateMusic(record.id,params))
        }else {
            dispatch(getMusicOfSceneData(SceneId));
            message.warning('对不起，您没有编辑权限，请示管理员或超级管理员操作此功能');
        }
    }

    backSceneType(){
        hashHistory.push("SceneContainer");
    }


    render() {
        const SceneName=this.props.location.state.SceneData.SceneName;
        const {musicstore} = this.props;
        const columns = [
            {title: '编号',dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },{title:this.props.location.state.SceneData.SceneName, dataIndex: 'name', key:'name', className:"columns",
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
            },{title: '审核状态', dataIndex: 'auditStatus', key:'auditStatus', className:"columns"
            }, {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="确定删除此声音吗?" onConfirm={() => this.onDelete(record,index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                            <a style={{backgroundColor:'none',paddingLeft:10}} onClick={() => this.onPressAudition(record)}>试听</a>
                        </div>
                    );
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
                            <a onClick={this.backSceneType.bind(this)}>情景</a><a>-</a><span>声音</span>
                        </div>
                        <div className="module_button">
                            <Search
                                placeholder="请输入搜索内容"
                                style={{ width: 300,paddingLeft:30 }}
                                onSearch={this.handleSearch.bind(this)}
                            />
                            <Button className="editable-add-btn" type="ghost" onClick={this.AddOnPress.bind(this)}>增加声音</Button>
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={musicstore.MusicStoreData}
                            columns={columns} />
                    </div>
                    <div>
                        <Modal title="增加声音" visible={musicstore.ModalVisible}
                               onCancel={this.handleCancel.bind(this)} footer={null} style={{ top: 40 }}
                        >
                            <div style={{height:600}}>
                                <UploadMusicPage SceneName={SceneName} SceneId={SceneId}/>
                            </div>
                        </Modal>
                    </div>
                    <div>
                        <Modal title="声音列表" visible={this.state.visible}
                               onCancel={this.handleClose.bind(this)} footer={null}
                        >
                            <AddSongsList SceneId={SceneId} SceneName={SceneName} Remark={1}/>
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
export default connect(mapStateToProps)(MusicListPage);
