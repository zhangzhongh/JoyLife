/**
 * Created by HULL on 2017/2/20.
 * 一级审核信息填写面板
 */
var React = require('react');
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import '../RoleContainer/AddRole.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button , Radio , Slider } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {reportAuditMusicData} from '../../actions/MusicStoreAction';
import GlobalVariable from '../../constants/GlobalVariable';

class MusicCheckPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            auditStatus:"已通过",
            visible: false
        }
    }

    /**
     * 表单提交的内容
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();
        const {dispatch,router}=this.props;
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(this.state.auditStatus=='已通过'|| values.content==undefined){
                values.content='';
            }
            if (!err) {
                var params={
                    "auditStatus":this.state.auditStatus,
                    "checkDescribe": values.content,
                    "auditTime":time
                };
                dispatch(reportAuditMusicData(this.props.location.state.MusicData.id,params));
                router.push('MusicCheckListContainer');
            }
        });
    }


    onChange(e){
        if( e.target.value=='否'){
            this.setState({
                visible:true,
                auditStatus:"未通过"
            });
        }else{
            this.setState({
                visible:false,
                auditStatus:"已通过"
            });
        }
    }

    render() {
        const disObj={display:this.state.visible? 'block':'none'};
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
        return (
            <div>
                <div className='module_header'>
                    <div className='title'>
                        <a>声库</a><a>-</a>审核
                    </div>
                </div>
                <div className='module_content'>
                    <div style={{marginBottom:15}}>
                        <span>声音名称:</span>
                        <span>{this.props.location.state.MusicData.name}</span>
                    </div>
                    <div style={{marginBottom:15}}>
                    <audio controls>
                        <source src={GlobalVariable.IP + this.props.location.state.MusicData.uploadDir} />
                    </audio>
                        </div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            {...formItemLayout}
                            label="通过"
                        >
                            {getFieldDecorator('radio-group')(
                                <RadioGroup  onChange={this.onChange.bind(this)}>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            style={disObj}
                            {...formItemLayout}
                            label="备注"
                        >
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: false, message: '请输入备注内容'
                                }]
                            })(
                                <div>
                                    <Input type="textarea" size="large" placeholder="请输入备注内容"  />
                                </div>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const MusicCheckPageForm = Form.create()(MusicCheckPage);
export default connect()(MusicCheckPageForm);