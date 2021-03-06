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
        return {
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render(){
        var items=[
            {icon:'account-box'},
            {icon:'wb-cloudy'},
            {icon:'attach-file'},
            {icon:'edit'},
            {icon:'mail-outline'}
        ]
         items=[
             {label:'常用联系人'},
             {label:'手机通讯录'},
             {label:'院内通讯录'}
         ]
        return (
            <Components.FlexLayout>
                <Components.MD.TabBar
                    theme="dark"
                    items={items}
                />
           </Components.FlexLayout>
        );
    },
    componentDidMount() {

    },
    componentDidUpdate() {

    }
});