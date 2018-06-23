/**
 * Created by jiangzz on 2017/2/17.
 * 添加歌曲列表 ，加载显示所有歌曲
 */

var React=require('react');
import {connect} from 'react-redux';
import { Table, Button,Spin } from 'antd';
import {UpdateSONGS} from '../../actions/MusicOfRoomActions';
import {getAuditMusicData,createMusic} from '../../actions/MusicStoreAction';

class AddSongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // 选中的歌曲，当前行元素的下标
            pagination:1
        };
    }

    /*
    * 只加载显示已审核通过歌曲
    * */
    componentDidMount(){
        const{dispatch}=this.props;
        dispatch(getAuditMusicData('已通过'));
    }

    /*
    * 添加歌曲
    * Rowmusic:选中当前行歌曲元素
    * this.props.SceneId：歌曲所属情景的id
    * params：对选中的歌曲原所属情景id 改为 确定要添加的所属情景id内
    * */
    handleAddMusic() {
        const{dispatch,musicstore}=this.props;
        var SceneId=this.props.SceneId; //歌曲所属情景id
        var SceneName=this.props.SceneName;
        var RowKeys=this.state.selectedRowKeys;
        var UpdatemusicArray=[]; //定义一个数组，用于当选中多首歌曲同时添加时
        var remark=this.props.Remark;
        RowKeys.forEach(function(RowKeys,index){
            var Rowmusic=musicstore.StoreMusicList[RowKeys];
            var moment = require('moment');
            var time=moment().format('YYYY-MM-DD HH:mm:ss');
            var createTime=moment(Rowmusic.createTime).format('YYYY-MM-DD HH:mm:ss');
            var auditTime=moment(Rowmusic.auditTime).format('YYYY-MM-DD HH:mm:ss');
            delete Rowmusic.id;
            Rowmusic.sceneId=SceneId;
            Rowmusic.sceneName=SceneName;
            Rowmusic.createTime=createTime;
            Rowmusic.auditTime=auditTime;
            if(remark != undefined){
                Rowmusic.auditStatus='已添加';
                Rowmusic.createTime=time;
            }
            UpdatemusicArray.push(Rowmusic);
        });
        var obj={"prams":UpdatemusicArray};
        if(remark != undefined){
            dispatch(createMusic(obj));
        }else{
            dispatch(UpdateSONGS(obj));
        }
        this.setState({selectedRowKeys: [],pagination:1}); //添加完成后清空选择
    }

    /*
    * 选择歌曲勾选操作
    * selectedRowKeys:选中的当前歌曲行的下标
    * */
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys:selectedRowKeys });
    }

    onPaginationChange(page){
        this.setState({ pagination:page });
    }

    render() {
        const columns = [
            {title: '声音名称', dataIndex: 'name', key:'name'},
            {title: '歌手', dataIndex: 'singer', key:'singer'},
            {title:'时长',dataIndex:'duration',key:'duration'},
            {title:'所属情景',dataIndex:'sceneName',key:'sceneName'}
        ];
        const{musicstore}=this.props;
        const { selectedRowKeys,pagination } = this.state;
        const currentPage = {pagination, onChange: this.onPaginationChange.bind(this)};
        const rowSelection = {selectedRowKeys, onChange: this.onSelectChange.bind(this)};
        const hasSelected = selectedRowKeys.length > 0 ;
        if (musicstore.fetchedStoreMusic==false){
            return(
                <div style={{marginTop:'20%',textAlign:'center'}}>
                    <Spin size="large" />
                </div>
            )
        }else {
            return (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.handleAddMusic.bind(this)}
                                disabled={!hasSelected}>确定添加</Button>
                        <span style={{ marginLeft: 8 }}>{hasSelected ? `点击确定，选择的 ${selectedRowKeys.length} 首声音将成功添加到该情景内` : ''}</span>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        pagination={currentPage}
                        columns={columns}
                        dataSource={musicstore.StoreMusicList}
                        scroll={{ y: 300 }} />
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    const {musicstore} = state;
    return {
        musicstore
    }
}
export default connect(mapStateToProps)(AddSongsList);
