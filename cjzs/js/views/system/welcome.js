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
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import Components from '../../components'
import Environment from '../../environment'
var SystemInfo=NativeModules.SystemInfoAndroid;
module.exports=React.createClass({
    getInitialState(){
      return {
          count:3,
          isloaded:false
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
                         <Image source={{uri:'icon1'}} style={{width:80,height:80,borderRadius:15}}/>
                         <Text style={WelcomeStyle.subTitle}>地质勘测信息化，让工作更轻松</Text>
                         {
                             !this.state.isloaded?<ActivityIndicator
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
                       {this.state.isloaded?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            position: 'absolute',
                            right: 16,
                            top: Environment.IMMERSE_OFFSET+16
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
        SystemInfo.getInfo((info)=>{
            var json=JSON.parse(info);
            Environment.ANDROID_VERSION_CODE=json.androidVersionCode;
            Environment.APP_VERSION_CODE=json.appVersionCode;
            Environment.APP_VERSION_NAME=json.appVersionName;
            if(Environment.ANDROID_VERSION_CODE>=19)
                Environment.IMMERSE_OFFSET=25
            else
                Environment.IMMERSE_OFFSET=0
            this.time = setInterval(function () {
                this.setState({isloaded:true,count:--this.state.count})
                //ToastCustom.show(this.state.count+"",ToastCustom.SHORT)
                if(this.state.count==0){
                    clearInterval(this.time);
                    this.jump("index");
                }
            }.bind(this), 1000);
            //alert("安卓版本："+systeminfo.ANDROID_VERSION_CODE+";应用程序版本："+systeminfo.APP_VERSION_CODE+";应用程序版本名称："+systeminfo.APP_VERSION_NAME);
        });
    }
});
const WelcomeStyle=StyleSheet.create({
    //欢迎页容器
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    //欢迎页主标题
    mainTitle: {
        fontSize: 40,
        marginTop: 100,
        color: '#fff'
    },
    //欢迎页副标题
    subTitle: {
        fontSize: 16,
        marginTop:20,
        marginBottom: 10,
        color: '#aaa'
    },
    //欢迎页按钮容器
    btns: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 60
    },
    //欢迎页进入按钮
    comeinBtn: {
        borderWidth: 1,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10
    },
    //欢迎页进入按钮
    comeinText: {
        color: '#fff',
        fontSize: 14
    }
})