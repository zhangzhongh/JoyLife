/**
 * Created by HULL on 2017/2/10.
 * 歌曲统计列表
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMusicStatisticalData} from '../../actions/MusicStatisticalAction';
import 'antd/dist/antd.css';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import GlobalVariable from '../../constants/GlobalVariable';
import { hashHistory } from 'react-router'
import {Table, Button, Popconfirm, Input, Modal} from 'antd';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class MusicStatisticalPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(fetchMusicStatisticalData());
    }

    render() {
        const columns=[
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },{title: '歌名', dataIndex: 'name',key:'name', className:"columns"},
            {title: '歌手', dataIndex: 'singer', key:'singer',className:"columns"},
            {title: '图片', dataIndex: 'soundImg', key:'soundImg', className:"columns",
                render: (text, record, index) => {
                    const imgUrl=GlobalVariable.IP+record.soundImg;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }
            },{title: '上传时间', dataIndex: 'createTime',key:'createTime', className:"columns",
                render: (text, record, index) => {
                    var moment = require('moment');
                    var createTime=moment(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                    return(
                        <div><text>{createTime}</text></div>
                    )
                }
            },{title: '上传人', dataIndex: 'uploader',key:'uploader', className:"columns"},
            {title: '类型', dataIndex: 'type', key:'type',className:"columns"},
            {title: '热度', dataIndex: 'hitCount', key:'hitCount',className:"columns"},
            {title: '审核状态', dataIndex: 'auditStatus',key:'auditStatus', className:"columns"}
        ];

        const {musicstatistical} = this.props;
        if (musicstatistical.fetched==false){
            return(
                <div>加载中...</div>
            )
        }else {
            return (
                <div >
                    <div className='module_header'>
                        <div className='title'>
                            <a>统计</a><a>-</a>声音统计
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            dataSource={musicstatistical.MusicStatisticalData}
                            columns={columns} />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const {musicstatistical} = state;
    return {
        musicstatistical
    }
}
export default connect(mapStateToProps)(MusicStatisticalPage);