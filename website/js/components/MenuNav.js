/*
主菜单
*/
import React, {Component} from 'react';
import './MenuNav.css';

export default class MenuNav extends Component {
  render() {
      return (
        <ul className="menu_nav">
          {this.listData(this)}
        </ul>
      );
  }

  listData(thisClass){
    return (
        this.props.dataSource.map(function(row,index) {
          return (
            <li onClick={thisClass.props.onClick.bind(this,index)} key={index}
                className={thisClass.props.activeIndex==index?"active":""}>
              <a>
                <img className="img" src={row.icon} />
              </a>
              <span className="nav_tooltip">{row.title}</span>
            </li>
          );
        })
    );
  }

};

