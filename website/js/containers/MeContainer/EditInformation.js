/**
 * Created by syl on 2017/2/9.
 * 个人信息界面内的 编辑资料页面
 */
var React = require('react');
import {connect} from 'react-redux';
import './EditInformation.css';
import { Spin, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button , Radio , Slider } from 'antd';
const FormItem = Form.Item;
import {UpdateRoleInfo} from '../../actions/MaintainActions';
import { hashHistory } from 'react-router';

class EditInformation extends React.Component {
    constructor(props) {
        super(props);
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
                var params={
                    "phone": values.phone,
                    "email": values.email
                };
                const {dispatch}=this.props;
                dispatch(UpdateRoleInfo(this.props.maintain.account.id,params));
                this.props.form.resetFields();
            }
        });
    }

    backRoomMaintenanceList(){
        hashHistory.push("PersonInfo");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {maintain,form} = this.props;
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
            }
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
                    <div className="module_header">
                        <div className='title'>
                            <a className="backhover" onClick={this.backRoomMaintenanceList.bind(this)}>个人信息-</a>
                            <span>资料编辑</span>
                        </div>
                    </div>
                    <div className='body_div'>
                        <div className="div_img">
                            <img className="pic_area"  src={require('./img/info_icon.png')} />
                        </div>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem
                                {...formItemLayout}
                                label="手机号"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: false, message: '请输入您的手机号!'
                                    }]
                                })(
                                    <div>
                                        <Input type="number" className="content_style" addonBefore={<Icon type="mobile" />} defaultValue={maintain.account.phone} />
                                    </div>
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
                                        required: false, message: '请输入您的邮箱'
                                    }]
                                })(
                                    <div>
                                        <Input className="content_style" addonBefore={<Icon type="mail" />} defaultValue={maintain.account.email} />
                                    </div>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="账号"
                            >
                                <Input className="content_style" addonBefore={<Icon type="user" />} value={maintain.account.username} disabled={true} />
                            </FormItem>
                            <FormItem {...tailFormItemLayout} >
                                <Button className="div_button"  type="primary" htmlType="submit" size="large">提交</Button>
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
const EditInformationForm = Form.create()(EditInformation);
export default connect(mapStateToProps)(EditInformationForm);
