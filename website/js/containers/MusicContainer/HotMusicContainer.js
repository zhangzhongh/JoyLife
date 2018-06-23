/**
 * Created by HULL on 2017/2/9.
 * 最热
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHotMusic,fetchHotMusicSearchResult} from '../../actions/MusicStoreAction';
import '../RoomMaintenance/RoomMaintenanceList.css';
import GlobalVariable from '../../constants/GlobalVariable';
import { hashHistory } from 'react-router';
import {Table, Button, Popconfirm, Input,Spin,Modal} from 'antd';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
import {__musicAudition__} from '../../utils/common';
const Search = Input.Search;

class HotMusicContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(getHotMusic());
    }

    /*
     * 试听方法
     * */
    onPressAudition(record){
        return __musicAudition__(record.singer,
                                record.name,
                                record.uploadDir
                               );
    }

    handleSearch(value){
        const{dispatch}=this.props;
        dispatch(fetchHotMusicSearchResult(value));
    }

    /*
     * 回到一级菜单界面方法
     * */
    backMusicStore(){
        hashHistory.push("MusicContainer");
    }

    render() {
        const {musicstore} = this.props;
        const columns= [
            {title: '编号', dataIndex: 'id', key:'id', className:"columns",
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }
            },{title: '最热声音', dataIndex: 'name',key:'name', className:"columns"},
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
                        <div>
                            <text>{createTime}</text>
                        </div>
                    )
                }
            },{title: '上传人', dataIndex: 'uploader', key:'uploader',className:"columns"},
            {title: '上传人角色', dataIndex: 'uploaderRole',key:'uploaderRole', className:"columns"},
            {title: '热度', dataIndex: 'hitCount',key:'hitCount', className:"columns"},
            {title: '操作', dataIndex: 'operation',key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <span>
                            <a style={{backgroundColor:'none',paddingLeft:10}} onClick={() => this.onPressAudition(record)}>试听</a>
                        </span>
                    );
                }
            }
        ];

        if (musicstore.fetched==false){
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
                            <a onClick={this.backMusicStore.bind(this)}>声库</a><a>-</a><span>最热</span>
                        </div>
                        <div className='module_button'>
                            <Search
                                placeholder="请输入搜索内容"
                                style={{ width: 300,paddingLeft:30 }}
                                onSearch={this.handleSearch.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="module_content">
                        <Table
                            bordered
                            rowKey="id"
                            columns={columns}
                            dataSource={musicstore.MusicStoreData}
                        />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const {musicstore} = state;
    return {
        musicstore
    }
}
export default connect(mapStateToProps)(HotMusicContainer);
