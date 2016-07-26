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
    TouchableHighlight
} from 'react-native';
import WelcomeStyle from '../../stylesheets/welcomeStyle';
module.exports=React.createClass({
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (<Image style={WelcomeStyle.container} source={{uri: 'bg'}}>
                    <Text style={WelcomeStyle.mainTitle}>浙江省地质调查院</Text>
                    <Text style={WelcomeStyle.subTitle}>野外采集录入系统 v1.0</Text>
                </Image>);
    },
    componentDidMount(){
        this.time = setTimeout(function () {
            this.jump("index");
        }.bind(this), 3000);
    }
});