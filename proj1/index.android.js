/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import Scenes from "./js/views/demo/scenes";
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
        // var comp=<Views.Welcome onPress={this.handleComeinBtn}></Views.Welcome>;
        // if (this.state.comein)
        //     comp = <Scenes></Scenes>;
        var comp = <Scenes></Scenes>
        return (<View style={{flex:1}}>{comp}</View>);
    }
});

AppRegistry.registerComponent('proj1', () => proj1);
