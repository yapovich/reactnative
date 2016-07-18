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
class FlexLayout extends Component {
    render() {
        var style = {
            flex:this.props.flex?this.props.flex:1,
            flexDirection:this.props.flexDirection?this.props.flexDirection:'column',
            alignItems:this.props.alignItems?this.props.alignItems:null,
            justifyContent:this.props.justifyContent?this.props.justifyContent:null
        };
        return (<View style={style}>{this.props.children}</View>)
    }
}
module.exports=FlexLayout;