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
    ScrollView,
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return null;
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (<ScrollView style={{flex:1}}>
                        <Components.ListNavigator
                        icons={[
                            [
                                {text:<Text>&#xf002;</Text>,label:'配置项1'},
                                {text:<Text>&#xf003;</Text>,label:'配置项2'},
                            ],
                            {text:<Text>&#xf004;</Text>,label:'配置项3'},
                            {text:<Text>&#xf004;</Text>,label:'配置项4'}
                        ]}
                       />
              </ScrollView>
        );
    },
    componentDidMount() {

    }
});