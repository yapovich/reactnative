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
    ScrollView,
    Alert,
    NativeModules
} from 'react-native';
import Components from '../../components';
import Environment from "../../environment";
var SystemInfo=NativeModules.SystemInfoAndroid
module.exports=React.createClass({
    getInitialState(){
        return {};
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.BaiduMap
                    style={{flex:1}}
                    showsUserLocation={true}
                />
             </Components.FlexLayout>
        );
    }
});