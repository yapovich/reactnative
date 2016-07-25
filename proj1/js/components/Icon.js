/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
class MyIcon extends Component {
    render() {
        var style = {};
        var size=this.props.size?this.props.size:16
        if (this.props.text) {
            style.fontFamily = 'fontawesome';
            if (this.props.color);
            style.color = this.props.color;
            style.fontSize = size;
            style.width = size;
            style.textAlign = "center";
        }
        else if (this.props.source) {
            style.width = size;
            style.height = size;
        }
        if(this.props.borderRadius)
            style.borderRadius=this.props.borderRadius;
        if (this.props.margin)
            style.margin = this.props.margin;
        if (this.props.marginLeft)
            style.marginLeft = this.props.marginLeft;
        if (this.props.marginTop)
            style.marginTop = this.props.marginTop;
        if (this.props.marginRight)
            style.marginRight = this.props.marginRight;
        if (this.props.marginBottom)
            style.marginBottom = this.props.marginBottom;
        if (this.props.text) {
            return (<Text style={style}>{this.props.text}</Text>);
        } else if (this.props.source) {
            return (<Image style={style} source={this.props.source}></Image>);
        } else {
            return null;
        }
    }
}
module.exports=MyIcon;