/**
 * Created by jiangzz on 2017/1/20.
 * 房间维护 列表 界面
 */
var React = require('react');
import {connect} from 'react-redux';
import { Table,Input, Icon, Button, Popconfirm,Modal,Spin ,Upload,message} from 'antd';
import EditableCell from '../../components/EditableCell';//编辑场景名称控件

import  './RoomMaintenanceList.css';
import GlobalVariable from '../../constants/GlobalVariable';
import {fetchRoom,AddROOM,DeleteROOM,UpdateROOM,uploadRoomImgFile} from '../../actions/RoomActions';
import { hashHistory } from 'react-router'
import {fetchScene} from '../../actions/SceneOfRoomActions';
var roomImgfile='roomImgfile';//定义上传房间图片的文件夹
var  roomImgName='';//定义上传房间图片名字
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class RoomMaintenanceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editName:undefined,//房间名称编辑内容
            visible:false,//点击增加房间，弹出modal编辑名称
            editDescribe:undefined,//房间描述编辑内容
        };
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(fetchRoom('token'));
    }

    /*
    * 情景维护
    * record: 当前房间元素
    * index：当前房间行的下标
    * */
    SceneMaintenance(record,index){
        /*  roomId 点击进入情景维护的所属房间id */
        const{dispatch,router}=this.props;
        dispatch(fetchScene(record.id));
        router.push({ pathname: "SceneMaintenanceList",state: { roomId: record.id }});
    }

    /*
    * 可重新编辑房间名称
    * index:修改当前元素行的下标
    * key:  dataIndex：name
    * value ：修改完成后的内容
    * record:当前行的数据
    * */
    onCellChange(value,record,index, key){
            const params ={
                name: value,
                createPerson:localStorage.getItem("username")
            };
            const {dispatch}=this.props;
            dispatch(UpdateROOM(record.id,params))
    }
    /*可重新编辑房间描述*/
    onCellChangeDescribe(value,record,index, key){
            const params ={
                describe: value,
                createPerson:localStorage.getItem("username")
            };
            const {dispatch}=this.props;
            dispatch(UpdateROOM(record.id,params))
    }

    /*
     * 删除指定房间
     * record :删除指定的当前行元素
     * index：删除指定的当前行元素下标
     * */
    onDelete(record,index){
            const{dispatch}=this.props;
            dispatch(DeleteROOM(record.id));
    }

    /*点击增加房间按钮操作，打开modal框*/
    handleAdd(){
        this.setState({visible:true});
    }

    /*增加房间时，对编辑房间名称内容 进行保存*/
    onChangeEditName(e){
        this.setState({editName: e.target.value});
    }

    /*增加房间时，对编辑房间描述内容，进行保存*/
    onChangeEditDescribe(e){
        this.setState({editDescribe:e.target.value});
    }

    /*点击取消关闭操作*/
    handleCancel(){
        this.setState({visible:false});
    }

    /*
     * 添加房间。点击modal确定按钮关闭操作，并且调用接口增加房间
     * newData :添加一个新的房间
     * createPerson:创建人（登录人）
     * */
    handleOk(){
        this.setState({visible:false});
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(this.state.editName==undefined||this.state.editName==''){
            message.warning('请您输入房间名称！');
        }else{
            if(roomImgName==''){
                message.warning('图片不能为空哦~请上传图片！');
            }else{
                const newData = {
                    name: this.state.editName,
                    createTime: time,
                    createPerson:localStorage.getItem("username"),
                    describe:this.state.editDescribe,
                    img:'Rooms/'+roomImgfile+'/downloadRoomImg?file='+roomImgName,
                    type:'default'
                };
                const{dispatch}=this.props;
                dispatch(AddROOM(newData));
                //创建新房间成功后，将文本框内容清空
                roomImgName='';
                this.setState({editName:undefined,editDescribe:undefined})
            }
        }
    }

    /*
    *上传的图片onchange返回的结果
    * roomImgfile：上传图片存放的文件夹名
    * roomImgName:用于在下载图片时使用
    * */
    handleImgUpload(fileList){
        roomImgName=fileList.file.name;
        const {dispatch}=this.props;
        if(this.state.editName==undefined||this.state.editName==''){
            message.warning('请您输入房间名称！');
        }else{
            dispatch(uploadRoomImgFile(roomImgfile,fileList.file.name,fileList.file))
        }
    }

    render() {
        const columns = [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }},{title: '场景名称', dataIndex: 'name', key:'name', className:"columns",
                render: (text, record, index) => (
                    <EditableCell
                        value={text}
                        onChange={(value) => this.onCellChange(value,record,index, 'name')}
                    />
                )},
            {title: '描述', dataIndex: 'describe', key:'describe', className:"columns",
                render:(text,record,index) => (
                    <EditableCell
                        value={text}
                        onChange={(value) => this.onCellChangeDescribe(value,record,index, 'describe')}
                    />
                )},
            {title: '图片', dataIndex: 'img', key:'img', className:"columns",
                render:(text, record, index) =>{
                    var imgUrl=GlobalVariable.IP + record.img;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }},
            {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="确定删除此房间吗?"  onConfirm={() => this.onDelete(record,index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                            <a className="scene-btn" onClick={() => this.SceneMaintenance(record,index)}>情景维护</a>
                        </div>
                    );
                }
        }];

        const {room}=this.props;
        if (room.fetched==false){
            return(
                <div style={{marginTop:'40%',textAlign:'center'}}>
                    <Spin size="large" />
                </div>
            )
        }else {
            return (
                <div>
                    <div className="module_header">
                        <div className="title">
                            房间维护
                        </div>
                        <div className="module_button">
                            <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd.bind(this)}>增加房间</Button>
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={room.RoomMaintenanceData}
                            columns={columns} />
                    </div>
                    <div>
                        <Modal title="增加房间"
                               visible={this.state.visible}
                               onOk={this.handleOk.bind(this)}
                               onCancel={this.handleCancel.bind(this)}
                        >
                            <p>房间名称:<Input
                                    placeholder="房间名称"
                                    defaultValue={this.state.editName}
                                    style={{width:'80%',marginLeft:'10px'}}
                                    onChange={this.onChangeEditName.bind(this)}/></p>
                            <p>房间描述:<Input
                                    placeholder="房间描述"
                                    defaultValue={this.state.editDescribe}
                                    style={{width:'80%',marginLeft:'10px',marginTop:'20px'}}
                                    onChange={this.onChangeEditDescribe.bind(this)}/></p>
                            <span style={{marginTop:'20px'}}>房间图片:</span>
                                <Upload
                                    name="text"
                                    listType="text"
                                    customRequest={this.handleImgUpload.bind(this)}
                                    >
                                    <Button type="ghost" style={{marginLeft:'10px',marginTop:'20px'}} >
                                        <Icon type="upload"/> 上传图片
                                    </Button>
                                </Upload>
                        </Modal>
                    </div>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    const {room} = state;
    return {
        room
    }
}
export default connect(mapStateToProps)(RoomMaintenanceList);