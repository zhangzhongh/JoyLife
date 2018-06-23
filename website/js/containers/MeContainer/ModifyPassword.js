/**
 * Created by syl on 2017/2/9.
 * 个人信息界面内的 修改密码页面
 */
var React = require('react');
import {connect} from 'react-redux';
import './ModifyPassword.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button , Radio , Slider } from 'antd';
const FormItem = Form.Item;
import {UpdatePassword} from '../../actions/MaintainActions';
import { hashHistory } from 'react-router';

class ModifyPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            passwordDirty: false
        }
    }

    /**
     * 表单提交的内容
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                if(values.newPassword.length < 6){
                    alert("新密码长度不能小于6位数");
                }else{
                    var params={
                        "oldPassword": values.oldPassword,
                        "newPassword": values.newPassword
                    };
                    const {dispatch}=this.props;
                    dispatch(UpdatePassword(params));
                    this.props.form.resetFields();
                }

            }
        });
    }
    /**
     *  获取密码框中鼠标的焦点
     * @param e
     */
    handlePasswordBlur(e) {
        const value = e.target.value;
        if(value.length < 6){
            alert("密码长度不能小于6位数");
        }
        this.setState({ passwordDirty: this.state.passwordDirty || !!value });
    }
    /**
     *  验证两次输入的密码。确认新密码
     * @param rule
     * @param value
     * @param callback
     */
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }
    /**
     *  验证密码是否为空。输入新密码
     * @param rule
     * @param value
     * @param callback
     */
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    /**
     *  输入旧密码
     * @param rule
     * @param value
     * @param callback
     */
    checkoldPassword(rule, value, callback){
        if (value && value !== localStorage.getItem("password")) {
            callback('旧密码输入错误！');
        } else {
            callback();
        }
    }

    backRoomMaintenanceList(){
        hashHistory.push("PersonInfo");
    }

    render() {
        const {maintain}=this.props;
        const { getFieldDecorator } = this.props.form;
        //设置加载formItemLayout（输入框，单选按钮，多选框，进度条）的样式
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 }
        };
        //设置加载tailFormItemLayout（提交按钮）的样式
        const tailFormItemLayout = {
            wrapperCol: {
                span: 20,
                offset: 2
            },
        };
        //defaultValue={['唱歌']}  设置多选框的默认值
        return (
            <div>
                <div className="module_header">
                    <div className='title'>
                        <a className="backhover" onClick={this.backRoomMaintenanceList.bind(this)}>个人信息-</a>
                        <span>修改密码</span>
                    </div>
                </div>
                <div className='body_div'>
                    <div className="div_img">
                        <img className="pic_area"  src={require('./img/info_icon.png')} />
                    </div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            {...formItemLayout}
                            label="旧密码"
                            hasFeedback
                        >
                            {getFieldDecorator('oldPassword', {
                                rules: [{
                                    required: true, message: '请输入旧密码'
                                }, {
                                    validator: this.checkoldPassword.bind(this)
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock" />} type="password" onBlur={this.handlePasswordBlur.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="新密码"
                            hasFeedback
                        >
                            {getFieldDecorator('newPassword', {
                                rules: [{
                                    required: true, message: '请输入新密码'
                                }, {
                                    validator: this.checkConfirm.bind(this)
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock" />} type="password" onBlur={this.handlePasswordBlur.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认新密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请再次输入新密码'
                                }, {
                                    validator: this.checkPassword.bind(this)
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock" />} type="password" />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button className="div_button" type="primary" htmlType="submit" size="large">提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {maintain} = state;
    return {
        maintain
    }
}
const ModifyPasswordForm = Form.create()(ModifyPassword);
export default connect(mapStateToProps)(ModifyPasswordForm);
