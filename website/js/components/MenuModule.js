/*
模块子菜单
*/
import React, {Component} from 'react';
import './MenuModule.css';

export default class MenuModule extends Component {

  render() {
    return (
      <div className="module_menu">
        <div className="header">
          <span className="title">{this.props.title}</span>
        </div>
        {this.listData(this)}
      </div>
    );
  }
    /**
     * 一级菜单触发事件
     */
  //显示菜单节点
  listData(thisClass){
    if( !this.props.dataSource) return;
    return (
      this.props.dataSource.map(function(module,index) {
          return (
              <div>
                <div className={thisClass.props.activeIndex==index?"section_header_active":"section_header"}
                    onClick={thisClass.onClickModule.bind(this,thisClass,index,module.page)}>
                  {module.title}
                </div>
                <ul>
                  {thisClass.showPanel(thisClass,module,index)}
                </ul>
              </div>
            );
      })
    );
  }
    /**
     * 二级菜单触发事件
     */
  onClickModule(thisClass,index,page){
    if(page){
      thisClass.props.onClick(index,page);
    }
  }
    /**
     * 显示二级菜单面板
     */
  //显示子功能面板
  showPanel(thisClass,module,moduleNo){
    if( !module.panels) return;
    return (
      module.panels.map(function(panel,index) {
        return (
          <li className={thisClass.props.activeIndex==(moduleNo+"_"+index)?'active':''} 
          onClick={thisClass.props.onClick.bind(this,moduleNo+"_"+index,panel.page)}>
            <span className="title_panel">{panel.title}</span>
          </li>
        );
      })
    );
  }
  
};

