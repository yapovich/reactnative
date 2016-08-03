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
    TouchableOpacity,
    NativeModules
} from 'react-native';
import Components from '../../components'
import WelcomeStyle from '../../stylesheets/welcomeStyle';
var  ToastCustom=NativeModules.ToastCustomAndroid
var SystemInfo=NativeModules.SystemInfoAndroid;
module.exports=React.createClass({
    getInitialState(){
      return {
          count:9
      }
    },
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
                       <TouchableOpacity
                           activeOpacity={1}
                           style={{
                               position: 'absolute',
                               right: 14,
                               top: 14
                           }}
                           onPress={()=>{
                               clearInterval(this.time);
                               this.jump('index');
                           }}
                       >
                           <View style={{
                               backgroundColor:'#333',
                               opacity:0.5,
                               padding:5,
                               flexDirection:'row'
                           }}>
                             <Text style={{color:'#ffff00',marginRight:5,fontSize:12}}>{this.state.count}</Text>
                             <Text style={{color:"#fff",fontSize:12}}>跳过</Text>
                           </View>
                       </TouchableOpacity>
                </Image>);
    },
    componentDidMount(){
        if(this.props.delay) {
            this.time = setInterval(function () {
                this.setState({count:--this.state.count})
                //ToastCustom.show(this.state.count+"",ToastCustom.SHORT)
                if(this.state.count==0)
                  this.jump("index");
            }.bind(this), this.props.delay);
        }
    }
});