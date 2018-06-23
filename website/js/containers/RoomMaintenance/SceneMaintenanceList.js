/**
 * Created by jiangzz on 2017/1/24.
 * 情景维护界面
 */

var React=require('react');
import {connect} from 'react-redux';
import './RoomMaintenanceList.css';
import { Table,Button,Input, Icon,Popconfirm,Modal,Spin} from 'antd';
import {fetchScene,AddSCENE,DeleteSCENE,UpdateSCENE} from '../../actions/SceneOfRoomActions';

import EditableCell from '../../components/EditableCell';//编辑情景名称控件
import { hashHistory } from 'react-router';
import {fetchSongs} from '../../actions/MusicOfRoomActions';
var RoomId; //点击进入情景维护的所属房间id

class SceneMaintenanceList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editName:undefined,//房间名称编辑内容
            previewVisible:false //点击增加房间，弹出modal编辑名称
        };
    }

    componentDidMount(){
        //点击进入情景维护的所属房间id
        RoomId=this.props.location.state.roomId;
        const{dispatch}=this.props;
        dispatch(fetchScene(RoomId));
    }

    /*
     * 歌曲维护
     * record: 当前情景元素
     * index：当前情景行的下标
     * roomId: RoomId 用于进入歌曲维护界面在头部点击 情景维护时roomId不为空
     * */
    SongsMaintenance(record,index){
        const{dispatch,router}=this.props;
        dispatch(fetchSongs(record.id));
        router.push({pathname:'SongsMaintenanceList',state:{sceneId:record.id,sceneName:record.SceneName,roomId: RoomId}})
    }

    /*
    * 编辑情景
    * record:当前行的数据
    * RoomId:情景所属房间id
    * value ：修改完成后的内容
    * */
    onCellChange(value,record,index, key){
            const params={
                SceneName:value,
                createPerson:localStorage.getItem("username")
            };
            const{dispatch}=this.props;
            dispatch(UpdateSCENE(record.id,RoomId,params))
    }

    /*
     * 删除指定情景
     * record :删除指定的当前行元素
     * index：删除指定的当前行元素下标
     * RoomId:删除情景所属房间id，用于在删除成功后及时刷新该房间情景页面
     * */
    onDelete(record,index){
            const{dispatch}=this.props;
            dispatch(DeleteSCENE(record.id,RoomId));
    }

    /*点击增加房间按钮操作，打开modal框*/
    handleAdd(){
        this.setState({previewVisible:true});
    }

    /*对编辑房间名称内容 进行保存*/
    onChangeEditName(e){
        this.setState({editName: e.target.value})
    }

    /*点击取消关闭操作*/
    handleCancel(){
        this.setState({previewVisible:false});
    }

    /*
     * 添加情景。点击modal确定按钮关闭操作，并且调用接口增加情景
     * RoomId ：添加的情景所属房间id
     * createPerson:创建人（登录人）
     * */
    handleOk(){
        this.setState({previewVisible:false});
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        const newData = {
            SceneName: this.state.editName,
            createTime: time,
            createPerson:localStorage.getItem("username")
        };
        const {dispatch} = this.props;
        dispatch(AddSCENE(newData,RoomId))
    }

    //点击顶部指定返回的菜单页 房间维护
    backRoomMaintenanceList(){
        hashHistory.push("RoomMaintenanceList");
    }

    render(){
        const columns = [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }},{title: '情景名称', dataIndex: 'SceneName', key:'SceneName', className:"columns",
                render: (text, record, index) => (
                    <EditableCell
                        value={text}
                        onChange={(value) => this.onCellChange(value,record,index, 'SceneName')}
                    />
                )},
            {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="确定删除此情景吗?" onConfirm={() => this.onDelete(record,index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                            <a className="scene-btn" onClick={() => this.SongsMaintenance(record,index)}>声音维护</a>
                        </div>
                    );
                }
            }];

        const {SceneOfRoom} = this.props;
        if (SceneOfRoom.fetched==false){
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
                            <span>情景维护</span>
                        </div>
                        <div className="module_button">
                            <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd.bind(this)}>增加情景</Button>
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={SceneOfRoom.SceneMaintenanceData}
                            columns={columns} />
                    </div>
                    <div>
                        <Modal title="增加情景"
                               visible={this.state.previewVisible}
                               onOk={this.handleOk.bind(this)}
                               onCancel={this.handleCancel.bind(this)}
                        >
                            <p>情景名称:
                                <Input
                                    placeholder="情景名称"
                                    defaultValue={this.state.editName}
                                    style={{width:'80%',marginLeft:'10px'}}
                                    onChange={this.onChangeEditName.bind(this)}/></p>
                        </Modal>
                    </div>
                </div>
            );
        }
    }

}

function mapStateToProps(state) {
    const {SceneOfRoom} = state;
    return {
        SceneOfRoom
    }
}
export default connect(mapStateToProps)(SceneMaintenanceList);
