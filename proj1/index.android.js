/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {mainStyle} from './modules/stylesheets/main';
import WelCome from "./modules/views/welcome";
import Main from "./modules/views/main";
import Index from "./modules/views/index";
var proj1=React.createClass({
    getInitialState() {
        return {
            comein: false
        };
    },
    handleComeinBtn(){
        this.setState({comein:true});
    },
    render() {
        //var comp=<WelCome onPress={this.handleComeinBtn}></WelCome>;
        //if (this.state.comein)
            //comp = <Main></Main>
        var comp=<Index></Index>;
        return (
            <View style={mainStyle.wrapper}>{comp}</View>
        );
    }
});

AppRegistry.registerComponent('proj1', () => proj1);
