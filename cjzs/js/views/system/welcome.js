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
    NativeModules,
    ActivityIndicator
} from 'react-native';
import Components from '../../components'
import WelcomeStyle from '../../stylesheets/welcomeStyle';
var  ToastCustom=NativeModules.ToastCustomAndroid
var SystemInfo=NativeModules.SystemInfoAndroid;
module.exports=React.createClass({
    getInitialState(){
      return {
          count:2
      }
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    render() {
        return (<Image style={WelcomeStyle.container} source={{uri: 'welcome'}}>
                     <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',paddingTop:50}}>
                        <Components.Icon source={{uri:'icon1'}} size={80} borderRadius={15}/>
                         <Text style={WelcomeStyle.subTitle}>地质勘测信息化，让工作更轻松</Text>
                         {
                             this.props.loading?<ActivityIndicator
                                 animating={true}
                                 color={Components.MD.getColor()}
                                 style={{
                                     alignItems: 'center',
                                     justifyContent: 'center'
                                 }}
                                 size="large"
                             />:null
                         }
                         <Text style={{color:'#aaa',fontSize:10}}>{this.props.statusText}</Text>
                      </View>
                      <View style={{flex:1,justifyContent:'flex-end',padding:10}}>
                          <Text style={{color:'#fff',fontSize:10}}>版权所有：浙江省地质调查院</Text>
                      </View>
                       {!this.props.loading?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            position: 'absolute',
                            right: 14,
                            top: 14
                        }}
                        onPress={()=> {
                            clearInterval(this.time);
                            this.jump('index');
                        }}
                    >
                        <View style={{
                            backgroundColor: '#333',
                            opacity: 0.5,
                            padding: 5,
                            flexDirection: 'row'
                        }}>
                            <Text style={{color: '#ffff00', marginRight: 5, fontSize: 12}}>{this.state.count}</Text>
                            <Text style={{color: "#fff", fontSize: 12}}>跳过</Text>
                        </View>
                    </TouchableOpacity>:null}
                </Image>);
    },
    componentDidMount(){
        if(!this.props.loading) {
            this.time = setInterval(function () {
                this.setState({count:--this.state.count})
                //ToastCustom.show(this.state.count+"",ToastCustom.SHORT)
                if(this.state.count==0){
                    clearInterval(this.time);
                    this.jump("index");
                }

            }.bind(this), 1000);
        }
    }
});