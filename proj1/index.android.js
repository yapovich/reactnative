/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  NativeModules,
  Alert
} from 'react-native';
import Scenes from "./js/views/system/scenes";
import systeminfo from "./js/systeminfo";
var SystemInfo=NativeModules.SystemInfoAndroid;
var proj1=React.createClass({
    getInitialState() {
        return {
            inited: false,
            comein: false
        };
    },
    handleComeinBtn(){
        this.setState({comein: true});
    },
    render() {
        // var comp=<Views.Welcome onPress={this.handleComeinBtn}></Views.Welcome>;
        // if (this.state.comein)
        //     comp = <Scenes></Scenes>;
        var comp = <Scenes></Scenes>
        return (this.state.inited ?
                <View style={{flex: 1}}>{comp}</View> :
                <View style={{flex: 1, backgroundColor: '#000'}}></View>
        );
    },
    componentDidMount(){
        /*Alert.alert(
            '提示',
            '确定要保存吗？',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '确定', onPress: () => console.log('OK Pressed')}
            ]
        );*/

        SystemInfo.getInfo((info)=>{
            var json=JSON.parse(info);
            systeminfo.ANDROID_VERSION_CODE=json.androidVersionCode;
            systeminfo.APP_VERSION_CODE=json.appVersionCode;
            systeminfo.APP_VERSION_NAME=json.appVersionName;
            this.setState({inited:true});
            //alert("安卓版本："+systeminfo.ANDROID_VERSION_CODE+";应用程序版本："+systeminfo.APP_VERSION_CODE+";应用程序版本名称："+systeminfo.APP_VERSION_NAME);
        });
    }
});
AppRegistry.registerComponent('proj1', () => proj1);
