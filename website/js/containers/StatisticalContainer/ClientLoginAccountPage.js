/**
 * Created by HULL on 2017/2/10.
 * 客户端登录次数统计列表
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchClientLoginAccount} from '../../actions/ClientLoginStatisticalAction';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import GlobalVariable from '../../constants/GlobalVariable';
import { hashHistory } from 'react-router'
import {Table, Button, Popconfirm, Input, Modal} from 'antd';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class ClientLoginAccountPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(fetchClientLoginAccount());
    }

    render() {
        const columns=[
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }},
            {title: '用户昵称',dataIndex: 'nickname', key:'nickname', className:"columns"},
            {title: '账号',dataIndex: 'username', key:'username', className:"columns"},
            {title: '手机号', dataIndex: 'phone', key:'phone', className:"columns"},
            {title: '邮箱', dataIndex: 'email', key:'email', className:"columns"},
            {title: '性别', dataIndex: 'gender', key:'gender', className:"columns"},
            {title: '年龄', dataIndex: 'age', key:'age', className:"columns"},
            {title: '爱好', dataIndex: 'hobby', key:'hobby', className:"columns"},
            {title: '图片', dataIndex: 'imgUrl', key:'imgUrl', className:"columns",
                render: (text, record, index) => {
                    const imgUrl=GlobalVariable.IP+record.imgUrl;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }
            },
            {title: '职业', dataIndex: 'realm', key:'realm', className:"columns"},
            {title: '上传声音数', dataIndex: 'uploadAccount', key:'uploadAccount', className:"columns"},
            {title: '注册时间', dataIndex: 'createTime', key:'createTime', className:"columns",
                render: (text, record, index) => {
                    var moment = require('moment');
                    var time=moment(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return(
                        <div><text>{time}</text></div>
                    )
                }
            }
        ];

        const {clientloginstatistical} = this.props;
        if (clientloginstatistical.fetched==false){
            return(
                <div>加载中...</div>
            )
        }else {
            return (
                <div >
                    <div className='module_header'>
                        <div className='title'>
                            <a>统计</a><a>-</a>客户端注册用户统计
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={clientloginstatistical.ClientLoginAccountData}
                            columns={columns} />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const {clientloginstatistical} = state;
    return {
        clientloginstatistical
    }
}
export default connect(mapStateToProps)(ClientLoginAccountPage);