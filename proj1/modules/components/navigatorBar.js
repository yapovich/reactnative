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
                    <TouchableOpacity activeOpacity={1} style={MainStyle.toolbarNavIcon} onPress={this.props.leftBtn?this.props.leftBtn.action:null}>
                        <Text style={MainStyle.toolbarNavFont}>{this.props.leftBtn?this.props.leftBtn.text:null}</Text>
                    </TouchableOpacity>
                    <Text style={MainStyle.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
                </View>
                <View style={MainStyle.toolbarRight}>
                {
                    this.props.rightBtn?this.props.rightBtn.map(function(g){
                        return <TouchableOpacity activeOpacity={0.5}  style={MainStyle.toolbarNavIcon} onPress={g.action}>
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