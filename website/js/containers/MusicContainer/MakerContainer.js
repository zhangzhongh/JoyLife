/**
 * Created by HULL on 2017/2/9.
 * 声音创客
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMakerData,fetchMakerSearchResult,DeleteMaker} from '../../actions/MakerAction';
import '../RoomMaintenance/RoomMaintenanceList.css';
import { hashHistory } from 'react-router';
import {Table, Button, Popconfirm, Input, Modal,Spin} from 'antd';
import GlobalVariable from '../../constants/GlobalVariable';
import ImgZoomComponent from '../../components/ImgZoomComponent'; //显示图片
const Search = Input.Search;

class MakerContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(fetchMakerData());
    }

    onPressAction(record){
        const{router}=this.props;
        router.push({
            pathname: "MakeMusicContainer",
            state: { userId: record.id}
        });
    }

    /*
     * 删除操作功能方法
     * */
    onDelete(record,index){
        const{dispatch}=this.props;
        dispatch(DeleteMaker(record.id));
    }

    handleSearch(value){
        const{dispatch}=this.props;
        dispatch(fetchMakerSearchResult(value));
    }

    /*
     * 回到一级菜单界面方法
     * */
    backMusicStore(){
        hashHistory.push("MusicContainer");
    }

    render() {
        const {maker} = this.props;
        const columns = [
            {title: '编号', dataIndex: 'id', key: 'id', className:'columns',
                render: (text, record, index) => {
                    return(
                        <div><text>{index+1}</text></div>
                    )
                }},
            {title: '账号', dataIndex: 'username', key:'username', className:'columns'},
            {title: '邮箱', dataIndex: 'email', key:'email', className:'columns'},
            {title: '性别', dataIndex: 'gender', key:'gender', className:'columns'},
            {title: '图片', dataIndex: 'imgUrl', key:'imgUrl', className:"columns",
                render: (text, record, index) => {
                    const imgUrl=GlobalVariable.IP+record.imgUrl;
                    return(
                        <ImgZoomComponent  src={imgUrl}  style={{ width: '30px' }}/>
                    )
                }
            },
            {title: '年龄', dataIndex: 'age', key:'age', className:'columns'},
            {title: '爱好', dataIndex: 'hobby', key:'hobby', className:'columns'},
            {title: '领域', dataIndex: 'realm', key:'realm', className:'columns'},
            {title: '上传声音总数', dataIndex: 'uploadAccount', key:'uploadAccount', className:'columns'},
            {title: '操作', dataIndex: 'operation', key:'operation', className:"columns",
                render: (text, record, index) => {
                    return (
                        <span>
                            <a style={{backgroundColor:'none',paddingLeft:10}} onClick={() => this.onPressAction(record)}>声音列表</a>
                            <Popconfirm title="确定删除此数据吗?" className='delete' onConfirm={() => this.onDelete(record,index)}>
                                <a style={{backgroundColor:'none',paddingLeft:10}} href="#">删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ];
        if (maker.fetched==false){
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
                            <a onClick={this.backMusicStore.bind(this)}>声库</a><a>-</a><span>声音创客</span>
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
                            dataSource={maker.MakerData}
                        />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const {maker} = state;
    return {
        maker
    }
}
export default connect(mapStateToProps)(MakerContainer);