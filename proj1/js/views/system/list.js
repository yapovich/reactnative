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
    NativeModules,
} from 'react-native';
import Components from '../../components';
import IndexComponents from './indexComponents'
import IndexSetting from './indexSetting'
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title={this.props.title}
                    alignCenter={false}
                    leftBtn={{text:<Text>&#xf104;</Text>}}
                    rightBtn={
                        [
                            {text:<Text>&#xf14c;</Text>},
                            {text:<Text>&#xf067;</Text>}
                        ]
                    }
                />
                <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#fff'}}>
                    <Text>this is list</Text>
                </ScrollView>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});