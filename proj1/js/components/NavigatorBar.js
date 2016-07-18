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
import {NavigatorBarStyle} from '../stylesheets/componentStyle';
//样式
var _style= {
    toolbar: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: NavigatorBarStyle.backgroundColor?NavigatorBarStyle.backgroundColor:'#000'
    },
    toolbarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    toolbarNav: {
        flex: 1,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    toolbarNavIcon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbarNavFont: {
        color: NavigatorBarStyle.color?NavigatorBarStyle.color:'#fff',
        textAlign: 'center',
        fontFamily: 'fontawesome',
        fontSize: 24
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarTitleText: {
        fontSize: 18,
        color: NavigatorBarStyle.color?NavigatorBarStyle.color:'#fff',
        marginLeft: 12
    },
    toolbarTitleTextBorder: {
        flex: 1,
        borderColor: NavigatorBarStyle.splitColor?NavigatorBarStyle.splitColor:'#333',
        borderStyle: 'solid',
        borderLeftWidth: 1
    }
}
class NavigatorBar extends Component {
    render() {
        return (
            <View style={_style.toolbar}>
                <View style={_style.toolbarNav}>
                    {
                        this.props.leftBtn?
                        <TouchableOpacity activeOpacity={1} style={_style.toolbarNavIcon}
                              onPress={this.props.leftBtn.action}>
                            <Text
                                style={_style.toolbarNavFont}>{this.props.leftBtn.text}</Text>
                        </TouchableOpacity>:null
                    }
                    {
                        this.props.leftBtn?
                        <View style={[_style.toolbarTitleTextBorder,this.props.alignCenter?{alignItems:'center'}:null]}>
                            <Text style={_style.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
                        </View>:
                        <Text style={[_style.toolbarTitleText]}>{this.props.title?this.props.title:''}</Text>
                    }
                </View>
                <View style={_style.toolbarRight}>
                {
                    this.props.rightBtn?this.props.rightBtn.map(function(g,index){
                        var btn;
                        if(g.text){
                            btn=<Text style={_style.toolbarNavFont}>{g.text}</Text>;
                        }else if(g.source){
                            btn=<View  style={_style.toolbarNavIcon}><Image source={g.source}/></View>
                        }
                        return <TouchableOpacity key={"nv"+index} activeOpacity={0.5} style={_style.toolbarNavIcon} onPress={g.action}>
                            {btn}
                        </TouchableOpacity>
                    }):null
                }
                </View>
            </View>
        );
    }
}
module.exports=NavigatorBar;