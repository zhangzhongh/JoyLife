/**
 * Created by syl on 2017/2/9.
 * 更新标题栏页面
 */
var React = require('react');
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import '../RoleContainer/AddRole.css';
import { Form,Input,Select,Button,Upload,Spin,message,Icon,Modal } from 'antd';
const FormItem = Form.Item;
import {UpdatePanel} from '../../actions/PanelAction';
import { uploadFileAPI } from '../../utils/RequestUtils';
import { hashHistory } from 'react-router';
import GlobalVariable from '../../constants/GlobalVariable';
import AddSongPage from './AddSongPage';

class UpdatePanelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectValue:'',
            imgUrl:"",
            title:'',
            url:'',
            passwordDirty: false,
            flush:false,
            loading:false,
            visible: false
        }
    }

    componentDidMount(){
        this.setState({imgUrl:this.props.location.state.param.imgUrl,title:this.props.location.state.param.name,url:this.props.location.state.param.url,selectValue:this.props.location.state.param.type});
    }
    /**
     * 表单提交的内容
     * @param e
     */
    handleSubmit(e) {
        this.setState({loading:true});
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            var moment = require('moment');
            var time=moment().format('YYYY-MM-DD HH:mm:ss');
            if (!err) {
                var params={
                    "name": values.title,
                    "content": values.content,
                    "url": (this.state.selectValue=='视频' || this.state.selectValue=='音乐')?this.state.url:values.url,
                    "type": this.state.selectValue,
                    "updatePerson":localStorage.getItem("username"),
                    "imgUrl":this.state.imgUrl,
                    "updateTime":time
                };
                const {dispatch}=this.props;
                dispatch(UpdatePanel(this.props.location.state.param.id,params));
                this.setState({loading:false});
                hashHistory.push('PanelMaintainContainer');
            }
        });
    }
    handleCurrencyChange(e){
        this.setState({selectValue:e})
    }
    handleUpload(file){
        if(this.state.title=='' || this.state.title==null){
            message.warning('请先输入标题');
            return;
        }
        var params=this.props.location.state.param;
        uploadFileAPI({
            path:'Scenes/4/uploadMusic/'+ params.id +'/' + this.state.title,
            file:file.file.originFileObj
        })
            .then((responseData) => {
                if(responseData.error&&responseData.error.statusCode==401){
                    message.warning('对不起，您没有上传图片权限，请示管理员或超级管理员或上传者操作此功能');
                    return;
                }else{
                    message.success('上传图片成功');
                }
                this.setState({imgUrl:'Scenes/4/downloadMusic?file='+params.id+'_'+this.state.title+file.file.name.substr(file.file.name.length-4)});
            });
    }
    handleUploadVideo(file){
        if(this.state.title=='' || this.state.title==null){
            message.warning('请先输入标题');
            return;
        }
        if(file.file.name.substr(file.file.name.length-4) != '.mp4'){
            message.warning('请上传.mp4格式的视频');
            return;
        }
        var params=this.props.location.state.param;
        uploadFileAPI({
            path:'Scenes/4/uploadMusic/'+ params.id +'/' + this.state.title,
            file:file.file.originFileObj
        })
            .then((responseData) => {
                if(responseData.error&&responseData.error.statusCode==401){
                    message.warning('对不起，您没有上传视频权限，请示管理员或超级管理员或上传者操作此功能');
                    return;
                }else{
                    message.success('上传视频成功');
                }
                this.setState({url:'Scenes/4/downloadMusic?file='+params.id+'_'+this.state.title+'.mp4'});
            });
    }
    onchangeValue(e){
        this.setState({title:e.target.value});
    }
    //点击添加歌曲打开对话框
    handleAdd() {
        this.setState({ visible: true });
    }
    //点击取消关闭对话框
    handleCancel() {
        this.setState({ visible: false });
    }
    //添加音乐返回值
    handleMusic(e){
        this.setState({url: JSON.stringify(e),visible: false});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //设置加载formItemLayout（输入框，单选按钮，多选框，进度条）的样式
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 }
        };
        //设置加载tailFormItemLayout（提交按钮）的样式
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };
        var params=this.props.location.state.param;
        var itemView;
        if(this.state.selectValue=='视频'){
            itemView=<FormItem
                    {...formItemLayout}
                    label="视频文件"
                >
                    {getFieldDecorator('url', {
                        rules: [{ required: false, message: '请上传视频' }]
                    })(
                        <div style={{ width: '60px' }}>
                            <Upload name="picture" action={GlobalVariable.IP + 'Scenes/4/uploadMusic/'+params.id+'/'+this.state.title} listType="text" onChange={this.handleUploadVideo.bind(this)}>
                                <Button type="ghost"><Icon type="upload" /> 上传视频</Button>
                            </Upload>
                        </div>
                    )}
                </FormItem>
        }else if(this.state.selectValue=='音乐'){
            itemView=<FormItem
                {...formItemLayout}
                label="音频文件"
            >
                {getFieldDecorator('url', {
                    rules: [{ required: false, message: '请选择音乐' }]
                })(
                    <div style={{ width: '80px'}}>
                        <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd.bind(this)}>添加音乐</Button>
                    </div>
                )}
            </FormItem>
        }else {
            itemView=<FormItem
                {...formItemLayout}
                label="链接地址"
            >
                {getFieldDecorator('url', {
                    rules: [{ required: false, message: '请输入链接地址' }]
                })(
                    <div>
                        <Input size="large" placeholder="请输入链接地址" defaultValue={params.url} />
                    </div>
                )}
            </FormItem>
        }
        return (
            <div className="body_div">
                <div className='module_header'>
                    <div className='title'>
                        <a>声库</a><a>-</a>标题栏维护
                    </div>
                </div>
                <div className='module_content' style={{width:'70%',margin:'0px',marginTop:'10px'}}>
                    <div className='spin'>
                        <Spin size="large" spinning={this.state.loading}/>
                    </div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            {...formItemLayout}
                            label="标题名称"
                        >
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: false, message: '请输入标题名称!'
                                }]
                            })(
                                <div>
                                    <Input size="large" placeholder="请输入标题名称" defaultValue={params.name} onChange={this.onchangeValue.bind(this)}/>
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标题内容"
                        >
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: false, message: '请输入标题内容'
                                }]
                            })(
                                <div>
                                    <Input size="large" placeholder="请输入标题内容" defaultValue={params.content} type="textarea"/>
                                </div>
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
                                    <Select defaultValue={params.type} onChange={this.handleCurrencyChange.bind(this)}>
                                        <Select.Option value="广告">广告</Select.Option>
                                        <Select.Option value="音乐">音乐</Select.Option>
                                        <Select.Option value="活动">活动</Select.Option>
                                        <Select.Option value="视频">视频</Select.Option>
                                    </Select>
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标题图片"
                        >
                            {getFieldDecorator('imgUrl', {
                                rules: [{
                                    required: false
                                }]
                            })(
                                <div style={{ width: '60px' }}>
                                    <Upload name="picture" action={GlobalVariable.IP + 'Scenes/4/uploadMusic/'+params.id+'/'+this.state.title} listType="picture" onChange={this.handleUpload.bind(this)}>
                                        <img alt="" style={{ width: '60px' }} src={GlobalVariable.IP + this.state.imgUrl} />
                                    </Upload>
                                </div>
                            )}
                        </FormItem>
                        {itemView}
                        <FormItem {...tailFormItemLayout}>
                            <div style={{ width: '300px'}}>
                                <Button type="primary" htmlType="submit" size="large">提交</Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Modal title="声音列表" visible={this.state.visible}
                           onCancel={this.handleCancel.bind(this)} footer={null}
                    >
                        <AddSongPage handleMusic={this.handleMusic.bind(this)}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

const UpdatePanelPageForm = Form.create()(UpdatePanelPage);
export default connect()(UpdatePanelPageForm);