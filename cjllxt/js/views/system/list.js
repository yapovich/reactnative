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
    NativeModules
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
        };
    },
    pop(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        var mediaWidth=Dimensions.get('window').width;
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title={this.props.title}
                    alignCenter={false}
                    leftBtn={{text:<Text>&#xf104;</Text>,action:()=>this.pop()}}
                    rightBtn={
                        [
                            {text:<Text>&#xf14c;</Text>},
                            {text:<Text>&#xf067;</Text>}
                        ]
                    }
                />
                <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#fff'}}>
                </ScrollView>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});