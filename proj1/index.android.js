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
import Views from "./modules/views";
import Scenes from "./modules/scenes";
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
        //var comp=<Views.WelCome onPress={this.handleComeinBtn}></Views.WelCome>;
        //if (this.state.comein)
            //comp = <Scenes></Scenes>
        var comp = <Scenes></Scenes>
        return (<View style={{flex:1}}>{comp}</View>);
    }
});

AppRegistry.registerComponent('proj1', () => proj1);
