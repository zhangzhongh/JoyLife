/**
 * Created by HULL on 2017/1/22.
 * 推荐情景 列表界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMusicSceneData,AddMusicSceneData,DeleteRowScene,UpdateMusicScene,uploadFile} from '../../actions/CommendScene';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import EditableCell from '../../components/EditableCell';//编辑场景名称控件
import { hashHistory } from 'react-router'
import GlobalVariable from '../../constants/GlobalVariable';
import {Table, Button, Popconfirm, Input,Modal,Spin, Upload, Icon,message} from 'antd';
var sceneImgFile='5';//定义上传情景图片的文件夹
var sceneImgName;//定义上传情景图片的名称
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class SceneContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            editName:undefined,//情景名称编辑内容
            previewVisible:false, //点击增加情景，弹出modal编辑名称
        }
    }
    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(getMusicSceneData());
    }

    /*点击增加情景按钮操作，打开modal框*/
    handleAdd(){
        this.setState({previewVisible:true});
    }

    /*对编辑情景名称内容 进行保存*/
    onChangeEditName(e){
        this.setState({editName: e.target.value})
    }

    /*上传图片方法*/
    handleImgUpload(fileList){
        sceneImgName=fileList.file.name;
        const {dispatch}=this.props;
        if(this.state.editName==undefined||this.state.editName==''){
            message.warning('请您输入情景名称！');
        }else{
            dispatch(uploadFile(this.state.editName,sceneImgFile,'Img',fileList.file))
        }
    }

    /*点击取消关闭操作*/
    handleCancel(){
        this.setState({previewVisible:false});
    }

    /*
     * 添加情景。点击modal确定按钮关闭操作，并且调用接口增加情景
     * createPerson:创建人（登录人）
     * */
    handleOk(){
        this.setState({previewVisible:false});
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(this.state.editName==undefined||this.state.editName==''){
            message.warning('请您输入情景名称！');
        }else{
            if(sceneImgName==''||sceneImgName==undefined){
                message.warning('图片不能为空哦~请上传图片！');
            }else{
                var _ext=sceneImgName.substring(sceneImgName.lastIndexOf("."));
                const newData = {
                    SceneName: this.state.editName,
                    createTime: time,
                    createPerson:localStorage.getItem("username"),
                    img:'Scenes/'+sceneImgFile+'/downloadMusic?file='+this.state.editName+'_'+'Img'+_ext
                };
                const {dispatch} = this.props;
                dispatch(AddMusicSceneData(newData));
                //创建新房间成功后，将文本框内容清空
                sceneImgName='';
                this.setState({editName:undefined})
            }
        }
    }

    /*
     * 可重新编辑情景名称
     * index:修改当前元素行的下标
     * key:  dataIndex：name
     * value ：修改完成后的内容
     * */
    onCellChange(value,record,index,key){
            const params ={
                SceneName: value,
                createPerson:localStorage.getItem("username")
            };
            const {dispatch}=this.props;
            dispatch(UpdateMusicScene(record.id,params))
    }


    /*
     * 删除操作功能方法
     * */
    onDelete(record,index){
            const{dispatch}=this.props;
            dispatch(DeleteRowScene(record.id));
    }

    onPressMusicList(text,record,index) {
        const{router}=this.props;
        router.push({
            pathname: "MusicListPage",
            state: { SceneData: record }
        });
    }

    backMusicStore(){
        hashHistory.push("MusicContainer");
    }


    render() {
        const {commendscene} = this.props;
        const columns = [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            }, {title: '情景', dataIndex: 'SceneName', key:'SceneName', className:"columns",
                render: (text, record, index) => {
                    return (
                        <EditableCell
                            value={text}
                            onChange={(value) => this.onCellChange(value,record,index, 'SceneName')}
                        />
                    )
                }
            }, {title: '图片', dataIndex: 'img', key:'img', className:"columns",
                render:(text, record, index) =>{
                    var imgUrl=GlobalVariable.IP + record.img;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }}, {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <span>
                           <Popconfirm
                               title="确定删除此数据吗?"
                               className='delete'
                               onConfirm={() => this.onDelete(record,index)}>
                               <a href="#">删除</a>
                           </Popconfirm>
                               <a
                                   style={{backgroundColor:'none',paddingLeft:10}}
                                   onClick={() => this.onPressMusicList(text,record,index)}>
                                   声音列表
                               </a>
                        </span>
                    );
                }
            }
        ];
        if (commendscene.fetched==false){
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
                            <a onClick={this.backMusicStore.bind(this)}>声库</a>
                            <a>-</a>情景
                        </div>
                        <div className='module_button'>
                            <Button style={{float:'right'}} type="ghost" onClick={this.handleAdd.bind(this)}>增加情景</Button>
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            columns={columns}
                            dataSource={commendscene.MusicSceneData}
                        />
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
                            <span style={{marginTop:'20px'}}>情景图片:</span>
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
            )
        }
    }
}

function mapStateToProps(state) {
    const {commendscene} = state;
    return {
        commendscene
    }
}
export default connect(mapStateToProps)(SceneContainer);
