/**
 * Created by syl on 2017/2/9.
 * 维护人员列表
 */
var React = require('react');
import {connect} from 'react-redux';
import { Spin, Table,Input, Icon, Button, Popconfirm, } from 'antd';
import './RoleList.css';
import {fetchMaintain,DeleteMaintainPerson,UpdateRolePassword} from '../../actions/MaintainActions';


class MaintainPersonList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(fetchMaintain());
    }

    /*
    * 删除指定人员
    * record :删除指定的当前行元素
    * index：删除指定的当前行元素下标
    * */
    onDelete(record,index){
          const{dispatch}=this.props;
          dispatch(DeleteMaintainPerson('token',record.id));
    }

    /*
     * 点击确定重置密码
     * record :指定的当前行元素
     * index：指定的当前行元素下标
     * */
    onReset(record,index){
        var resetPwd=RndNum(6);
        var params={
            "id":record.id,
            "password": resetPwd
        };
        const{dispatch}=this.props;
        dispatch(UpdateRolePassword(params));
    }
    render() {
        const columns = [
            {title: 'id', dataIndex: 'id', key: 'id', className:'columns',
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }},
            {title: '手机号', dataIndex: 'phone', key:'phone', className:'columns'},
            {title: '邮箱', dataIndex: 'email', key:'email', className:'columns'},
            {title: '账号', dataIndex: 'username', key:'username', className:'columns'},
            {title: '权限', dataIndex: 'role', key:'role', className:'columns',
                render: (text, record, index) => {
                    var accountRole = "";
                    if(text=="uploader"){
                        accountRole = "上传";
                    }else if(text=="verifier"){
                        accountRole = "一级审核";
                    }else if(text=="topVerifier"){
                        accountRole = "二级审核";
                    }else if(text=="count"){
                        accountRole = "统计";
                    }else if(text=="manager"){
                        accountRole = "管理员";
                    }else if(text=="admin"){
                        accountRole = "超级管理员";
                    }
                    return(
                        <div><text>{accountRole}</text></div>
                    )
                }
            },
            {title: '操作', dataIndex: 'operation', key:'operation', className:'columns',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="是否删除?" className='delete' onConfirm={() => this.onDelete(record,index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                            <Popconfirm title="是否重置密码?" className='reset' onConfirm={() => this.onReset(record,index)}>
                                <a style={{backgroundColor:'none',paddingLeft:15}} href="#">重置密码</a>
                            </Popconfirm>
                        </div>
                    );
                }
        }];

        const {maintain}=this.props;
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
                            人员维护
                        </div>
                    </div>
                    <div className='module_content'>
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={maintain.MaintainPersonData}
                            columns={columns} />
                    </div>
                </div>
            );
        }
    }
}
/**
 * 生成6位数字的随机数
 * @param n
 * @returns {string}
 * @constructor
 */
function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++){
        rnd += Math.floor(Math.random()*10);
    }
    return rnd;
}

function mapStateToProps(state) {
  const {maintain} = state;
  return {
    maintain
  }
}

export default connect(mapStateToProps)(MaintainPersonList);
