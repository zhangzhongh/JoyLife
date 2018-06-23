/**
 * Created by jiangzz on 2017/1/22.
 * 文本名称编辑公共组件
 */
import React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import  './../containers/RoomMaintenance/RoomMaintenanceList.css';
export default class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }
    handleChange(e){
        const value = e.target.value;
        this.setState({ value });
    }
    check(){
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit(){
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (<div className="editable-cell">
            {
                editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            onPressEnter={this.check.bind(this)}
                        />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check.bind(this)}
                        />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        {value || ' '}
                        <Icon
                            type="edit"
                            className="editable-cell-icon"
                            onClick={this.edit.bind(this)}
                        />
                    </div>
            }
        </div>);
    }
}