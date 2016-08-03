/**
 * Created by yebo on 2016/7/14.
 * 自定义导航条
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules
} from 'react-native';
import {NavigatorBarStyle} from '../stylesheets/componentStyle';
import Environment from "../environment";
//样式
var _style= {
   toolbar: {
        paddingTop:Environment.IMMERSE_OFFSET,
        height: 48+Environment.IMMERSE_OFFSET,
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
    toolbarNavLabel: {
        height: 48,
        paddingRight:14,
        paddingLeft:14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarNavLabelText: {
        fontSize:14,
        color: NavigatorBarStyle.color?NavigatorBarStyle.color:'#fff',
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
        borderLeftWidth: 0
    },
    toolbarTitleTextNoBorder: {
        flex: 1
    },
}
class NavigatorBar extends Component {
    render() {
        return (
            <View style={_style.toolbar}>
                <View style={_style.toolbarNav}>
                    {
                        this.props.leftBtn?
                        <TouchableHighlight underlayColor={NavigatorBarStyle.hoverColor?NavigatorBarStyle.hoverColor:'#000'} style={_style.toolbarNavIcon}
                              onPress={this.props.leftBtn.action}>
                            <Text
                                style={_style.toolbarNavFont}>{this.props.leftBtn.text}</Text>
                        </TouchableHighlight>:null
                    }
                    {
                        this.props.leftBtn?
                        <View style={[_style.toolbarTitleTextBorder,this.props.alignCenter?{alignItems:'center'}:null]}>
                            <Text style={_style.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
                        </View>:
                         <View style={[_style.toolbarTitleTextNoBorder,this.props.alignCenter?{alignItems:'center'}:null]}>
                                <Text style={_style.toolbarTitleText}>{this.props.title?this.props.title:''}</Text>
                         </View>
                    }
                </View>
                <View style={_style.toolbarRight}>
                {
                    this.props.rightBtn?this.props.rightBtn.map(function(g,index){
                        var btn;
                        if(g.text){
                                btn=<View  style={_style.toolbarNavIcon}><Text style={_style.toolbarNavFont}>{g.text}</Text></View>;
                        }else if(g.source){
                            btn=<View  style={_style.toolbarNavIcon}><Image source={g.source}/></View>
                        }
                        var label
                        if(g.label){
                            label=<View style={_style.toolbarNavLabel}><Text style={_style.toolbarNavLabelText}>{g.label}</Text></View>
                        }
                        return <TouchableHighlight underlayColor={NavigatorBarStyle.hoverColor?NavigatorBarStyle.hoverColor:'#000'} key={"nv"+index} onPress={()=>g.action?g.action():null}>
                            <View style={_style.toolbarRight}>{btn}{label}</View>
                        </TouchableHighlight>
                    }):null
                }
                </View>
            </View>
        );
    }
}
module.exports=NavigatorBar;