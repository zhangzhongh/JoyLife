/**
 * Created by jiangzz on 2017/4/7.
 * 图片点击放大公共组件
 */
import React, {Component} from 'react';
import { Modal } from 'antd';

export default class ImgZoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgZoomVisible:false,
        }
    }

    render() {
        return (
            <div>
                <img alt=""  style={this.props.style} src={this.props.src}
                     onClick={()=>this.onImg()}/>
                <Modal visible={this.state.imgZoomVisible} footer={null} onCancel={this.PicturesClose.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={this.props.src} />
                </Modal>
            </div>
        );
    }

    //图片点击放大操作
    onImg(){
        this.setState({imgZoomVisible:true})
    }

    //图片点击关闭操作
    PicturesClose(){
        this.setState({imgZoomVisible:false});
    }
};
