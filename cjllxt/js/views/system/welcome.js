/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{ Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    NativeModules
} from 'react-native';
import Components from '../../components'
import WelcomeStyle from '../../stylesheets/welcomeStyle';
var SystemInfo=NativeModules.SystemInfoAndroid;
module.exports=React.createClass({
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (<Image style={WelcomeStyle.container} source={{uri: 'welcome'}}>
                     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Components.Icon source={{uri:'icon1'}} size={80} borderRadius={15}/>
                         <Text style={WelcomeStyle.subTitle}>地质勘测信息化，让工作更轻松</Text>
                         <Text style={{color:'#aaa',fontSize:10}}>{this.props.statusText}</Text>
                      </View>
                      <View style={{flex:1,justifyContent:'flex-end',padding:10}}>
                          <Text style={{color:'#fff',fontSize:10}}>版权所有：浙江省地质调查院</Text>
                      </View>
                </Image>);
    },
    componentDidMount(){
        if(this.props.delay) {
            this.time = setTimeout(function () {
                this.jump("index");
            }.bind(this), this.props.delay);
        }
    }
});