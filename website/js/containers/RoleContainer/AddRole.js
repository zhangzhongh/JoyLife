/**
 * Created by syl on 2017/2/9.
 * 添加维护人员
 */
var React = require('react');
import {connect} from 'react-redux';
import './AddRole.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button , Radio , Slider } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {fetchAddMaintain,fetchMaintain} from '../../actions/MaintainActions';

class AddMaintainPerson extends React.Component {
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
                if(values.password.length < 6){
                    alert("新密码长度不能小于6位数");
                }else{
                    var managerJson={
                        "phone": values.phone,
                        "email": values.email,
                        "username": values.username,
                        "nickname": values.username,
                        "password": values.password,
                        "role":values.role
                    };
                    const {dispatch} = this.props;
                    dispatch(fetchAddMaintain('token',managerJson));
                    //提交成功之后清空数据
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
     *  验证两次输入的密码
     * @param rule
     * @param value
     * @param callback
     */
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致！');
        } else {
            callback();
        }
    }
    /**
     *  验证密码是否为空
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
    render() {
        const { getFieldDecorator } = this.props.form;
        //设置加载formItemLayout（输入框，单选按钮，多选框，进度条）的样式
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 9 }
        };
        //设置加载tailFormItemLayout（提交按钮）的样式
        const tailFormItemLayout = {
            wrapperCol: {
                span: 20,
                offset: 1
            }
        };
        //defaultValue={['唱歌']}  设置多选框的默认值
        return (
            <div className="body_div">
                <div className='module_header'>
                    <div className='title'>
                        添加人员
                    </div>
                </div>
                <div className='module_content' style={{width:'70%',margin:'0px',marginTop:'10px'}}>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            {...formItemLayout}
                            label="手机号"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true, message: '请输入您的手机号!'
                                }]
                            })(
                                <Input type="number" className="content_style" addonBefore={<Icon type="mobile" />} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '输入邮箱的类型错误'
                                }, {
                                    required: true, message: '请输入您的邮箱'
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="mail" />} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="账号"
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入您的账号' }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="user" />} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入您的密码'
                                }, {
                                    validator: this.checkConfirm.bind(this)
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock" />} type="password" onBlur={this.handlePasswordBlur.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请在次输入您的密码'
                                }, {
                                    validator: this.checkPassword.bind(this)
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock" />} type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="权限"
                        >
                            {getFieldDecorator('role',{
                                rules: [{ required: true, message: '请选择您的权限' }]
                            })(
                                <RadioGroup className="content_style">
                                    <Radio value="uploader">上传</Radio>
                                    <Radio value="verifier">一级审核</Radio>
                                    <Radio value="topVerifier">二级审核</Radio>
                                    <Radio value="count">统计</Radio>
                                    <Radio value="manager">管理员</Radio>
                                </RadioGroup>
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
const AddMaintainPersonForm = Form.create()(AddMaintainPerson);

export default connect()(AddMaintainPersonForm);