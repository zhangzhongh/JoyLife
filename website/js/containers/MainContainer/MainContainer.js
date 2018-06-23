import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMenu,change_nav_menu,change_module} from '../../actions/MainAction';
import {fetchPersonInfo} from '../../actions/MaintainActions';

import './MainContainer.css';

import MenuNav from '../../components/MenuNav';
import MenuModule from '../../components/MenuModule';
import PersonInfo from '../MeContainer/PersonInfo';

import { hashHistory } from 'react-router'
class MainContainer extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
      if(localStorage.getItem("loginStatus")=='yes'){
          const {dispatch} = this.props;
          dispatch(fetchMenu('token'));
          localStorage.setItem("loginStatus", 'no');
      }else {
          window.location.href='/JoyLife/index.html';//本地测试改为/*
      }
  }

  componentWillReceiveProps(nextProps) {
    const {main} = nextProps;

  }

  render() {
      /*客户端人员登录隐藏个人信息事件*/
      if( localStorage.getItem("PersonnelLogin")=='MaintenancePersonnel'){
          var Personnel=<img className="pic_area" onClick={this.onPressImg.bind(this)} src={require('./img/PersonalCenter.png')} />
      }
    const {main} = this.props;
    if (main.fetched==false){
        return(
            <div>加载中...</div>
        )
    }else {
      return (
          <div className="main_body" style={{height:document.body.clientHeight>600? '100%':'600px'}}>
              <div className="app_nav_area">
                  <div className="top_area">
                        <img src={require('./img/logo.png')} />
                  </div>
                  <div className="middle_area">
                          <MenuNav 
                          activeIndex={main.menu_nav_index}
                          dataSource={main.menu_nav} 
                          onClick={this.onPressMenuNav.bind(this)}/>
                  </div>
                  <div className="bottom_area">
                      {Personnel}
                  </div>
              </div>
              <div className="main_body_side">
                  <MenuModule 
                  title={main.menu_modules_current.title}
                  activeIndex={main.module_current_index}
                  dataSource={main.menu_modules_current.modules} 
                  onClick={this.onPressMenuModule.bind(this)}/>
              </div>
              <div className="main_body_center">
                      {this.props.children}
              </div>
          </div>
      );
    }
  }

    /**
     * 一级菜单触发事件
     */
  onPressMenuNav(index){
    const {dispatch} = this.props;
    dispatch(change_nav_menu(index));
  }

    /**
     * 点击首页头像，显示个人信息事件
     */
  onPressImg(){
    const{dispatch,router}=this.props;
    var id=localStorage.getItem("userId");
    dispatch(fetchPersonInfo('token',id));
    router.push({
        pathname: "PersonInfo"
    });
  }

    /**
     * 三级菜单触发事件
     */
  onPressMenuModule(index,page){
    const {dispatch,router} = this.props;
    dispatch(change_module(index));
    
    //测试是否能传值用，正式时要删除state所在行，因为此处不需要传参
    router.push({
        pathname: page
    });
  }
}

function mapStateToProps(state) {
  const {main} = state;
  return {
    main
  }
}
export default connect(mapStateToProps)(MainContainer);
