import React, {Component} from 'react';
import './login.css';
import { message,Spin } from 'antd';
import { request,requestAPI } from '../../utils/RequestUtils';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state={
			loading:false
		}
	}

	componentDidMount(){
		sessionStorage.clear();
	}
	onPressLogin(){
		var username=document.getElementById('account').value;
		var password=document.getElementById('pwd').value;
		if (username=='' || username==null){
			message.error('请输入账号');
			return;
		}
		if (password=='' || password==null){
			message.error('请输入密码');
			return;
		}
		var params = {
			username:username,
			password:password
		};

		if(document.getElementById("MaintenancePersonnel").checked){
			this.setState({loading:true});
			requestAPI({
				path:'Accounts/login',
				method:'POST',
				params:params
			}).then((responseData) => {
				this.PersonnelLogined(responseData,username,password);
				localStorage.setItem("PersonnelLogin", 'MaintenancePersonnel'); //后台维护人员 登录场景角色
			})
		}else if(document.getElementById("clientPersonnelLogin").checked){
			this.setState({loading:true});
			requestAPI({
				path:'Registrators/login',
				method:'POST',
				params:params
			}).then((responseData) => {
				this.PersonnelLogined(responseData,username,password);
				localStorage.setItem("PersonnelLogin", 'clientPersonnelLogin'); //客户端人员 登录场景角色
			})
		}else{
			message.error('抱歉，请刷新页面重试~');
		}
	}

	PersonnelLogined(responseData,username,password){
		this.setState({loading:false});
		if(responseData.error){
			if(responseData.error.statusCode==401){
				message.error('账号不存在,请查看选择登录角色或重新输入');
			}else if(responseData.error.statusCode==402){
				message.error('密码错误,请重新输入');
			}else {
				message.error('登陆失败,请重试');
			}
		}else {
			if(document.getElementById("online").checked){
				localStorage.setItem("username", username);
				localStorage.setItem("password", password);
			}else {
				localStorage.setItem("username", '');
				localStorage.setItem("password", '');
			}
			localStorage.setItem("loginStatus", 'yes');
			localStorage.setItem("accessToken", responseData.id);
			localStorage.setItem("userId", responseData.userId);
			localStorage.setItem("role", responseData.userInfo.role);//登录人角色
			localStorage.setItem("username", responseData.userInfo.username); //登录人
			message.success('登陆成功');
			window.location.href='/JoyLife/main.html';//本地测试改为/main
		}
	}

  render() {
    return (
      <main>
	<div className="header"></div>
	<div className="loginWraper">
	  <div id="loginform" className="loginBox">
		  <div className='spin'>
			  <Spin size="large" spinning={this.state.loading}/>
		  </div>
	    <form className="form form-horizontal">
	      <div className="row cl">
		<label className="form-label col-xs-3"><i className="Hui-iconfont"><img src={require('./img/zhanghao.png')} style={{width:'25px',marginBottom:'6px'}}/></i></label>
		<div className="formControls col-xs-8">
		  <input id="account" name="account" type="text" placeholder="账户" className="input-text size-L" style={{fontSize:'14px',opacity:'0.8'}} defaultValue={localStorage.getItem("username")}/>
		</div>
	      </div>
	      <div className="row cl">
		<label className="form-label col-xs-3"><i className="Hui-iconfont"><img src={require('./img/mima.png')} style={{width:'25px',marginBottom:'6px'}}/></i></label>
		<div className="formControls col-xs-8">
		  <input id="pwd" name="pwd" type="password" placeholder="密码" className="input-text size-L" style={{fontSize:'14px',opacity:'0.8'}} defaultValue={localStorage.getItem("password")}/>
		</div>
	      </div>
	      <div className="row cl">
		<div className="formControls col-xs-8 col-xs-offset-3">
		  <label for="online">
			  <input type="checkbox" name="online" id="online" defaultChecked={true}/>
			  &nbsp;&nbsp;记住账号密码</label>
		</div>
	      </div>
	      <div className="row cl">
		<div className="formControls col-xs-8 col-xs-offset-3">
			<button type="button" className="submit" onClick={this.onPressLogin.bind(this)}>&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;</button>
		</div>
	      </div>
			<div className="row cl">
				<div className="formControls col-xs-8 col-xs-offset-3">
					<label for="MaintenancePersonnel">
						<input type="radio" name="online" id="MaintenancePersonnel" defaultChecked={true}/>
						&nbsp;&nbsp;后台维护人员登录</label>
					<label for="clientPersonnelLogin" style={{marginLeft:'30px'}}>
						<input type="radio" name="online" id="clientPersonnelLogin" />
						&nbsp;&nbsp;客户端用户登录</label>
				</div>
			</div>
			<div className="row cl">
				<div className="formControls col-xs-8 col-xs-offset-3">
				    <span style={{color:'#f00'}}>(注:选择客户端用户登录的人员需先在客户端注册账号后再进行登录)</span>
				</div>
			</div>
	    </form>
	  </div>
	</div>
	<div className="footer" style={{color:'#fff'}}>Copyright 郑州百灵电子技术股份有限公司</div>
      </main>
    );
  }
}

export default Home;
