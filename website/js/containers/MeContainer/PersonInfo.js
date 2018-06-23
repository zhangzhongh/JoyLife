/**
 * Created by syl on 2017/2/9.
 * 个人信息界面
 */
var React = require('react');
import {connect} from 'react-redux';
import './PersonInfo.css';
import { Spin, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button , Radio , Slider } from 'antd';
const FormItem = Form.Item;
import ModifyPassword from './ModifyPassword';
import EditInformation from './EditInformation';
import {fetchEditInformation,fetchModifyPassword} from '../../actions/MaintainActions';

class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     *  点击跳转到编辑资料界面
     */
    onEditButton() {
        const{dispatch,router,maintain}=this.props;
        dispatch(fetchEditInformation(maintain.account));
        router.push({
            pathname: "EditInformation"
        });
    }
    /**
     *  点击跳转到修改密码界面
     */
    onModifyButton() {
        const{dispatch,router,maintain}=this.props;
        dispatch(fetchModifyPassword(maintain.account));
        router.push({
            pathname: "ModifyPassword"
        });
    }
    /**
     *  退出操作
     */
    onExitButton() {
        window.location.href='/JoyLife/index.html';//本地测试改为/*
        sessionStorage.clear();
    }
    render() {
        const {maintain}=this.props;
        //设置加载formItemLayout（输入框，单选按钮，多选框，进度条）的样式
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 9 }
        };
        //设置加载tailFormItemLayout（提交按钮）的样式
        const tailFormItemLayout = {
            wrapperCol: {
                span: 20,
                offset: 2
            },
        };
        //defaultValue={['唱歌']}  设置多选框的默认值
        if (maintain.fetched==false){
            return(
                <div style={{marginTop:'40%',textAlign:'center'}}>
                    <Spin size="large" />
                </div>
            )
        }else {

            return (
                <div>
                    <div className='module_header'>
                        <div className='title'>
                            个人信息
                        </div>
                    </div>
                    <div className="body_div" style={{ position:'absolute',height:document.body.clientHeight>690? '600px':'500px', width:'80%',overflow:'scroll',overflowX:'hidden'}}>
                        <div className="div_img">
                            <img className="pic_area"  src={require('./img/info_icon.png')} />
                        </div>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="手机号"
                            >
                                <Input className="content_style" addonBefore={<Icon type="mobile" />} disabled={true} value={maintain.account.phone} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="邮箱"
                                hasFeedback
                            >
                                <Input className="content_style" addonBefore={<Icon type="mail" />} disabled={true} value={maintain.account.email} />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="账号"
                            >
                                <Input className="content_style" addonBefore={<Icon type="user" />} disabled={true} value={maintain.account.username} />
                            </FormItem>
                            <FormItem {...tailFormItemLayout} >
                                <Button onClick={this.onEditButton.bind(this)} className="div_button" size="large">编辑资料</Button>
                            </FormItem>
                            <FormItem {...tailFormItemLayout} >
                                <Button onClick={this.onModifyButton.bind(this)} className="div_button"  size="large">修改密码</Button>
                            </FormItem>
                            <FormItem {...tailFormItemLayout} >
                                <Button onClick={this.onExitButton.bind(this)} className="div_button"  size="large">退出</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    const {maintain} = state;
    return {
        maintain
    }
}
const PersonInfoForm = Form.create()(PersonInfo);
export default connect(mapStateToProps)(PersonInfoForm);
