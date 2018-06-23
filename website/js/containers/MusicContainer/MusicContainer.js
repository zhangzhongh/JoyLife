import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMenu,change_nav_menu,change_module} from '../../actions/MainAction';
import { Table,Input, Icon, Button, Popconfirm, } from 'antd';
const Search = Input.Search;
import '../RoomMaintenance/RoomMaintenanceList.css';
import AddSuperMusicPage from './AddSuperMusicPage';

import { browserHistory } from 'react-router'

class MusicContainer extends Component {
  constructor(props) {
      super(props);
    this.state={
      isVisible:false
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    //dispatch(fetchMenu('token'));
  }

  componentWillReceiveProps(nextProps) {
    //const {main} = nextProps;

  }

  render() {
    /*客户端人员登录直接显示上传界面*/
    if(localStorage.getItem("PersonnelLogin")=='clientPersonnelLogin'){
         var clientLogin= <AddSuperMusicPage />
    }
    const {main} = this.props;
    var visible={display:this.state.isVisible? 'block':'none'};
    if (main.fetched==false){
        return(
            <div>加载中...</div>
        )
    }else {
      return (
        <div>
          <div className='module_header'>
            <div className='title'>
                <span>声库</span>
            </div>
          </div>
          <div className="module_content"  style={{width:'50%',overflow:'hidden'}}>
            {clientLogin}
          </div>
        </div>
      );
    }
  }
    /*
     <Button
     className='music_store_style'
     type="ghost" onClick={this.onPressSearch.bind(this)}>
     查询
     </Button>
     <Button
     className='music_store_style'
     type="ghost" onClick={this.onPressCommunist.bind(this)}>
     汇总
     </Button>
     <Search style={visible} className="SearchStyle" placeholder="input search text"
     onSearch={value => console.log(value)}/>*/

  onPressSearch(){
    this.setState({
      isVisible:true
    })
  }

  onPressCommunist(){
    this.setState({
      isVisible:false
    })
  }
}

function mapStateToProps(state) {
  const {main} = state;
  return {
    main
  }
}
export default connect(mapStateToProps)(MusicContainer);