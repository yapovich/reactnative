/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  NativeModules
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
        SystemInfo.getVersion((version)=>{
            systeminfo.VERSION=version;
            this.setState({inited:true});
            //alert("systeminfo.VERSION:"+systeminfo.VERSION);
        });
    }
});
AppRegistry.registerComponent('proj1', () => proj1);
