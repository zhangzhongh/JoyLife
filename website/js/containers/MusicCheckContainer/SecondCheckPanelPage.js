/**
 * Created by HULL on 2017/2/21.
 * 二级审核信息填写面板
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAuditLoggingData,reportMusicData} from '../../actions/MusicCheckAction';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router'
import {Table, Button, Popconfirm, Input, Modal,Spin} from 'antd';
import GlobalVariable from '../../constants/GlobalVariable';
class SecondCheckPanelPage extends Component {
    constructor(props) {
        super(props);
        this.state={
          isVisible:false,
            checkDescribe:''
        };
    }

    componentDidMount(){
        const{dispatch}=this.props;
        var name=this.props.location.state.MusicData.name;
        var singer=this.props.location.state.MusicData.singer;
        var sceneName=this.props.location.state.MusicData.sceneName;
       dispatch(getAuditLoggingData(name,singer,sceneName));
    }


//面包屑导航跳转至首页
    backSceneType(){
        hashHistory.push("MusicContainer");
    }
//面包屑导航跳转至审核声音
    backCheckMusic(){
        hashHistory.push("MusicCheckListContainer");
    }
//通过按钮
    onPressPass(isOrNot){
        const {dispatch}=this.props;
        var moment = require('moment');
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
            var params = {
                "auditStatus": isOrNot,
                "checkDescribe": this.state.checkDescribe == null ? '':this.state.checkDescribe,
                "auditor": localStorage.getItem('username'),
                "auditTime": time
            };
        dispatch(reportMusicData(this.props.location.state.MusicData.id,params,this.props.location.state.MusicData.userId));
        hashHistory.push("MusicCheckListContainer");
    }

    //未通过按钮
    onPressNotPass(){
        this.setState({
            isVisible:true
        });
    }

    handleOk(){
        this.setState({
            isVisible:false
        });
        this.onPressPass('未通过');
    }

    handleCancel(){
        this.setState({
            isVisible:false
        })
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({ checkDescribe:value });
    }

    render() {
        const {musiccheck} = this.props;
        const columns= [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },{title:'声音名称', dataIndex: 'name', key:'song', className:"columns"},
            {title: '歌手', dataIndex: 'singer', key:'singer', className:"columns"},
            {title: '审核状态', dataIndex: 'auditStatus', key:'auditStatus', className:"columns"},
            {title: '审核人', dataIndex: 'auditor', key:'auditor', className:"columns"},
            {title: '审核备注', dataIndex: 'describe', key:'describe', className:"columns"},
            {title: '审核时间', dataIndex: 'auditTime', key:'auditTime', className:"columns",
                render: (text, record, index) => {
                    var moment = require('moment');
                    var auditTime=moment(record.auditTime).format('YYYY-MM-DD HH:mm:ss');
                    return(
                        <div>
                            <text>{auditTime}</text>
                        </div>
                    )
                }
            }
        ];
        if (musiccheck.fetched==false){
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
                            <a onClick={this.backSceneType.bind(this)}>声库</a><a>-</a><a onClick={this.backCheckMusic.bind(this)}>审核声音</a><a>-</a><span>审核</span>
                        </div>
                        <div className="module_button">
                            <div className="editable-add-btn">
                                <Button type="ghost" onClick={this.onPressPass.bind(this,'已通过')}>通过</Button>
                                <Button type="ghost" onClick={this.onPressNotPass.bind(this)}>未通过</Button>
                            </div>
                        </div>
                    </div>
                    <div className="module_content">
                        <div style={{marginBottom:'10px'}}>
                            <audio controls>
                                <source src={GlobalVariable.IP + this.props.location.state.MusicData.uploadDir} />
                            </audio>
                        </div>
                        <div>
                            <text style={{color:'blue'}}>已通过:{musiccheck.passedAccount}</text>
                            <text style={{marginLeft:10,color:'red'}}>未通过:{musiccheck.notPassAccount}</text>
                            <text style={{marginLeft:10}}>待审核:{musiccheck.auditing}</text>
                        </div>
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={musiccheck.AuditMusicStoreData}
                            columns={columns} />
                    </div>
                    <Modal title="未通过说明"
                           visible={this.state.isVisible}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}
                    >
                       <span>
                           备注说明:
                           <Input style={{width:400}} onChange={this.handleChange.bind(this)}/>
                       </span>
                    </Modal>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const {musiccheck} = state;
    return {
        musiccheck
    }
}
export default connect(mapStateToProps)(SecondCheckPanelPage);
