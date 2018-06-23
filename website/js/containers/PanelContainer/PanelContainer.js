/**
 * Created by HULL on 2017/2/10.
 * 音乐库内 标题栏维护界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPanelMaintain} from '../../actions/PanelAction';
import  '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router'
import {Table, Button, Popconfirm, Input, Spin,Modal} from 'antd';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片

class PanelContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const{dispatch}=this.props;
    dispatch(fetchPanelMaintain('token'));
  }

  onPressUpdate(text,record,index) {
    const{router}=this.props;
    router.push({
      pathname: "UpdatePanelPage",
      state: { param: record }
    });
  }

  render() {
    const columns=[
      {title: '编号', dataIndex: 'id', key:'id', className:"columns",
        render: (text, record, index) => {
          return(
              <div><text>{index+1}</text></div>
          )
        }},
      {title: '标题名称', dataIndex: 'name', key:'name', className:"columns"},
      {title: '标题内容', dataIndex: 'content', key:'content', className:"columns"},
      {title: '标题图片', dataIndex: 'imgUrl', key:'imgUrl', className:"columns",
        render: (text, record, index) => {
          const imgUrl=GlobalVariable.IP+record.imgUrl;
          return(
              <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
          )
        }
      },{title: '类型', dataIndex: 'type', key:'type', className:"columns"},
      {title: '更新人', dataIndex: 'updatePerson', key:'updatePerson', className:"columns"},
      {title: '更新时间', dataIndex: 'updateTime', key:'updateTime', className:"columns",
        render: (text, record, index) => {
          var moment = require('moment');
          var updateTime=moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss');
          return(
              <div><text>{updateTime}</text></div>
          )
        }
      },{title: '操作', dataIndex: '操作', className:"columns",
        render: (text, record, index) => {
          return (
              <span>
                <a style={{backgroundColor:'none',paddingLeft:10}}  onClick={() => this.onPressUpdate(text,record,index)}>
                  更新
                </a>
              </span>
          );
        }
      }
    ];

    const {panel} = this.props;
    if (panel.fetched==false){
      return(
          <div className='spin'>
            <Spin size="large" />
          </div>
      )
    }else {
      return (
          <div >
            <div className='module_header'>
              <div className='title'>
                <a>声库</a><a>-</a>标题栏维护
              </div>
            </div>
            <div className="module_content">
              <Table
                  bordered
                  rowKey="id"
                  dataSource={panel.PanelMaintainData}
                  columns={columns} />
            </div>
          </div>
      )
    }
  }
}

function mapStateToProps(state) {
  const {panel} = state;
  return {
    panel
  }
}
export default connect(mapStateToProps)(PanelContainer);