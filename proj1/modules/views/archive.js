/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    NativeModules
} from 'react-native';
import {MainStyle} from '../styles';
var ToastCustomAndroid= NativeModules.ToastCustomAndroid;
var archive=React.createClass({
    getInitialState() {
        return null;
    },
    render() {
        return (
            <View style={MainStyle.wrapper}></View>
        );
    }
});
module.exports=archive;