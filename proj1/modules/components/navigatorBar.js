/**
 * Created by yebo on 2016/7/14.
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {MainStyle} from '../styles';
class navigatorBar extends Component {
    render() {
        return (
            <View style={MainStyle.toolbar}>
                <View style={MainStyle.toolbarNav}>
                    {
                        this.props.leftBtn?
                        <TouchableOpacity activeOpacity={1} style={MainStyle.toolbarNavIcon}
                              onPress={this.props.leftBtn ? this.props.leftBtn.action : null}>
                            <Text
                                style={MainStyle.toolbarNavFont}>{this.props.leftBtn.text}</Text>
                        </TouchableOpacity>:null
                    }
                    {
                        this.props.leftBtn?
                        <View style={MainStyle.toolbarTitleTextBorder}><Text style={MainStyle.toolbarTitleText}>{this.props.title?this.props.title:''}</Text></View>:
                        <Text style={MainStyle.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
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
module.exports=navigatorBar;