/**
 * Created by HULL on 2017/2/22.
 * 上传声音
 */
var React = require('react');
import {connect} from 'react-redux';
import '../RoleContainer/AddRole.css';
import { Form, Input,Upload, Icon, Col, Button, Select,message } from 'antd';
const FormItem = Form.Item;
import {AddMusicOfSceneData,setModalVisible,uploadFile} from '../../actions/MusicStoreAction';
var Song='';
var Singer='';

class UploadMusicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectValue:'声音',
            disable:true
        }
    }

    /**
     * 表单提交的内容
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const newData = {
                    "name": values.name,
                    "singer": values.singer,
                    "lyric": values.lyric,
                    "describe": values.describe,
                    "type": this.state.selectValue,
                    "uploadDir": 'Scenes/'+this.props.SceneId+'/downloadMusic?file='+Singer+'_'+Song+'.mp3',
                    "soundImg": 'Scenes/'+this.props.SceneId+'/downloadMusic?file='+Singer+'_'+Song+'.jpg',
                    "createTime": time,
                    "topOrNot": 0,
                    "duration": values.duration,
                    "auditStatus": "待审核",
                    "auditor": "",
                    "uploader": localStorage.getItem("username"), //登录人,
                    "uploaderRole":localStorage.getItem("role"),//登录人角色
                    "hitCount": 0,
                    "downloadCount": 0,
                    "sceneName": this.props.SceneName,
                    "sceneId": this.props.SceneId,
                    "checkDescribe":"",
                    "userId":localStorage.getItem("userId")
                };
                const {dispatch} = this.props;
                dispatch(AddMusicOfSceneData(this.props.SceneId,newData));
            }
        });
    }

    handleImgUpload(img){
        const {dispatch} = this.props;
        const SceneId=this.props.SceneId;
        dispatch(uploadFile(SceneId,Song,Singer,img.file));
    }
    handleMusicUpload(music){
        const {dispatch} = this.props;
        const SceneId=this.props.SceneId;
        dispatch(uploadFile(SceneId,Song,Singer,music.file));
    }
    onImgPress(){
        if(this.state.disable){
            message.warning('请您输入声音名称和歌手名称！');
        }
    }
    onMusicPress(){
        if(this.state.disable){
            message.warning('请您输入声音名称和歌手名称！');
        }
    }

    onResetPress(){
        //重置之后清空数据
        this.props.form.resetFields();
    }

    getSongValue(e){
        Song=e.target.value;
    }
    getSingerValue(e){
        Singer=e.target.value;
    }
    imgFile(e){
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    changeType(e){
        this.setState({selectValue:e});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        //设置加载formItemLayout（输入框，单选按钮，多选框，进度条）的样式
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        //设置加载tailFormItemLayout（提交按钮）的样式
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 7
            }
        };
        return (
            <div className="body_div">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="声音名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入您上传的声音名称!'
                            }]
                        })(
                            <Input onChange={this.getSongValue.bind(this)} placeholder="请输入您上传的声音名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="歌手"
                    >
                        {getFieldDecorator('singer', {
                            rules: [{
                                required: true, message: '请输入歌手名称!'
                            }]
                        })(
                            <Input onChange={this.getSingerValue.bind(this)} placeholder="请输入歌手名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="歌词"
                    >
                        {getFieldDecorator('lyric', {
                            rules: [{
                                required: false, message: '请输入歌词!'
                            }]
                        })(
                            <Input type="textarea" placeholder="请输入歌词(每句歌词用逗号‘，’隔开)"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述"
                    >
                        {getFieldDecorator('describe', {
                            rules: [{
                                required: false, message: '请输入对声音的描述!'
                            }]
                        })(
                            <Input placeholder="请输入对声音的描述" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="时长"
                    >
                        {getFieldDecorator('duration', {
                            rules: [{
                                required: true, message: '请输入声音整数时长(单位:s)!(如：2分30秒输入150)'
                            }]
                        })(
                            <Input type="number" placeholder="请输入声音整数时长!(如：2分30秒输入150)"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                    >
                        {getFieldDecorator('type',{
                            rules: [{ required: false, message: '请选择类型' }]
                        })(
                            <div>
                                <Select defaultValue="声音" onChange={this.changeType.bind(this)} >
                                    <Select.Option value="摇滚">摇滚</Select.Option>
                                    <Select.Option value="流行">流行</Select.Option>
                                    <Select.Option value="经典">经典</Select.Option>
                                    <Select.Option value="声音">声音</Select.Option>
                                </Select>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传图片"
                    >
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.imgFile.bind(this),
                            rules: [{
                                required: true, message: '请上传声音图片!'
                            }]
                        })(
                            <Upload name="text"
                                    disabled={(Song==''&&Singer=='')?this.state.disable:!this.state.disable}
                                    listType="text"
                                    customRequest={this.handleImgUpload.bind(this)}>
                                <div>
                                    <Button type="ghost" onClick={this.onImgPress.bind(this)}>
                                        <Icon type="upload" /> 上传图片
                                    </Button>
                                    <text style={{color:'red'}}>尺寸:400*400</text>
                                </div>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传声音"
                    >
                        {getFieldDecorator('uploadmusic', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.imgFile.bind(this),
                            rules: [{
                                required: true, message: '请上传声音文件!'
                            }]
                        })(
                            <Upload name="text"
                                    disabled={(Song==''&&Singer=='')?this.state.disable:!this.state.disable}
                                    listType="text"
                                    customRequest={this.handleMusicUpload.bind(this)}>
                                <div>
                                    <Button type="ghost" onClick={this.onMusicPress.bind(this)}>
                                        <Icon type="upload" /> 上传声音
                                    </Button>
                                    <text style={{color:'red'}}>音频格式:.mp3</text>
                                </div>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.onResetPress.bind(this)}style={{marginRight:20}} size="large">重置</Button>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const UploadMusicPageForm = Form.create()(UploadMusicPage);
export default connect()(UploadMusicPageForm);
