/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Modal,
  NativeModules,
  Alert
} from 'react-native';
import Scenes from "./js/views/system/scenes";
import Environment from "./js/environment";
import Components from "./js/components";
var SystemInfo=NativeModules.SystemInfoAndroid;
var cjllxt=React.createClass({
    getInitialState() {
        return {
            modalVisible:false,
            modalView:null,
            inited: true,
            comein: false
        };
    },
    handleComeinBtn(){
        this.setState({comein: true});
    },
    showModal(view){
      this.setState({modalView:view,modalVisible: true});
    },
    hideModal(){
        this.setState({modalView:null,modalVisible: false});
    },
    render() {
        var WelCome=require("./js/views/system/welcome");
        // if (this.state.comein)
        //     comp = <Scenes></Scenes>;
        var comp = <Scenes></Scenes>
        return (this.state.inited ?
                <View style={{flex: 1}}>
                    <Modal
                        ref={(modal)=>this.modal=modal}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible:false})}}
                    >
                        {this.state.modalView}
                    </Modal>
                    {comp}
                </View> :
                <WelCome statusText="正在初始化..."/>
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
        Components.global=this;
        SystemInfo.getInfo((info)=>{
            var json=JSON.parse(info);
            Environment.ANDROID_VERSION_CODE=json.androidVersionCode;
            Environment.APP_VERSION_CODE=json.appVersionCode;
            Environment.APP_VERSION_NAME=json.appVersionName;
            if(Environment.ANDROID_VERSION_CODE>=19)
                Environment.IMMERSE_OFFSET=25
            this.setState({inited:true});
            //alert("安卓版本："+systeminfo.ANDROID_VERSION_CODE+";应用程序版本："+systeminfo.APP_VERSION_CODE+";应用程序版本名称："+systeminfo.APP_VERSION_NAME);
        });
    },
    componentWillMount(){
    }
});
AppRegistry.registerComponent('cjllxt', () => cjllxt);
