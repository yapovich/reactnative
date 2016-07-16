/**
 * Created by yebo on 2016/7/14.
 * 自定义导航条
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {MainStyle} from '../styles';
class NavigatorBar extends Component {
    render() {
        return (
            <View style={MainStyle.toolbar}>
                <View style={MainStyle.toolbarNav}>
                    {
                        this.props.leftBtn?
                        <TouchableOpacity activeOpacity={1} style={MainStyle.toolbarNavIcon}
                              onPress={this.props.leftBtn.action}>
                            <Text
                                style={MainStyle.toolbarNavFont}>{this.props.leftBtn.text}</Text>
                        </TouchableOpacity>:null
                    }
                    {
                        this.props.leftBtn?
                        <View style={[MainStyle.toolbarTitleTextBorder,this.props.alignCenter?{alignItems:'center'}:null]}>
                            <Text style={MainStyle.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
                        </View>:
                        <Text style={[MainStyle.toolbarTitleText]}>{this.props.title?this.props.title:''}</Text>
                    }
                </View>
                <View style={MainStyle.toolbarRight}>
                {
                    this.props.rightBtn?this.props.rightBtn.map(function(g,index){
                        return <TouchableOpacity key={"nv"+index} activeOpacity={0.5} style={MainStyle.toolbarNavIcon} onPress={g.action}>
                            <Text style={MainStyle.toolbarNavFont}>{g.text}</Text>
                        </TouchableOpacity>
                    }):null
                }
                </View>
            </View>
        );
    }
}
module.exports=NavigatorBar;