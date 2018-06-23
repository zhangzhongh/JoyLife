/**
 * Created by jiangzz on 2017/2/4.
 * 推荐歌曲维护
 */
var React=require('react');
import {connect} from 'react-redux';
import './RoomMaintenanceList.css';
import { Table,Button,Input, Icon,Popconfirm,Upload,Modal,notification,Spin} from 'antd';
import {fetchSongs,DeleteSONGS} from '../../actions/MusicOfRoomActions';
import { hashHistory } from 'react-router';
import AddSongsList from './AddSongsList';
var SceneId; //点击进入歌曲维护的所属情景id
var SceneName;
import {__musicAudition__} from '../../utils/common';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class SongsMaintenanceList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,   //添加歌曲的Modal框控制
        };
    }
    componentDidMount(){
        //点击进入歌曲维护的所属情景id
        SceneId=this.props.location.state.sceneId;
        SceneName=this.props.location.state.sceneName;
        const{dispatch}=this.props;
        dispatch(fetchSongs(SceneId))
    }

    /*试听点击*/
    onPressAudition(record){
        return __musicAudition__(
            record.singer,
            record.name,
            record.uploadDir
        );
    }

    //点击添加歌曲打开对话框
    handleAdd() {
        this.setState({ visible: true });
    }

    //点击取消关闭对话框
    handleCancel(e) {
        this.setState({ visible: false });
        const{dispatch}=this.props;
        dispatch(fetchSongs(SceneId))
    }

    /*
     * 删除指定歌曲
     * record :删除指定的当前行元素
     * index：删除指定的当前行元素下标
     * SceneId:删除歌曲所属情景id
     * */
    onDelete(record,index){
            const{dispatch}=this.props;
            dispatch(DeleteSONGS(record.id,SceneId));
    }

    //点击顶部指定返回菜单页 房间维护
    backRoomMaintenanceList(){
        hashHistory.push("RoomMaintenanceList");
    }
    //点击顶部指定返回菜单页 情景维护
    backSceneMaintenanceList(){
        const{router}=this.props;
        router.push({pathname:'SceneMaintenanceList',state:{roomId: this.props.location.state.roomId}})
    }

    render(){
        const columns = [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },{title: '声音', dataIndex: 'name', key:'name', className:"columns"},
            {title: '歌手', dataIndex: 'singer', key:'singer', className:"columns"},
            {title: '描述', dataIndex: 'describe', key:'describe', className:"columns"},
            {title: '图片', dataIndex: 'soundImg', key:'soundImg', className:"columns",
                render:(text, record, index) =>{
                    const imgUrl=GlobalVariable.IP+record.soundImg;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }},
            {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="确定删除此声音吗?" onConfirm={() => this.onDelete(record,index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                            <a className="scene-btn" onClick={() => this.onPressAudition(record)}>试听</a>
                        </div>
                    );
                }
            }];

        const {MusicOfRoom} = this.props;
        if (MusicOfRoom.fetched==false){
            return(
                <div style={{marginTop:'40%',textAlign:'center'}}>
                    <Spin size="large" />
                </div>
            )
        }else {
            return (
                <div>
                    <div className="module_header">
                        <div className='title'>
                            <a className="backhover" onClick={this.backRoomMaintenanceList.bind(this)}>房间维护-</a>
                            <a className="backhover" onClick={this.backSceneMaintenanceList.bind(this)}>情景维护-</a>
                            <span>推荐声音维护</span>
                        </div>
                        <div className="module_button">
                            <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd.bind(this)}>增加声音</Button>
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={MusicOfRoom.SongsMaintenanceData}
                            columns={columns} />
                    </div>
                    <div>
                        <Modal title="增加声音" visible={this.state.visible}
                               onCancel={this.handleCancel.bind(this)} footer={null}
                        >
                            <AddSongsList SceneId={SceneId} SceneName={SceneName}/>
                        </Modal>
                    </div>
                </div>
            );
        }
    }

}

function mapStateToProps(state) {
    const {MusicOfRoom} = state;
    return {
        MusicOfRoom
    }
}
export default connect(mapStateToProps)(SongsMaintenanceList);



