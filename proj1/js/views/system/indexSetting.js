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
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="配置"
                    alignCenter={true}
                    rightBtn={
                        [
                            {text:<Text>&#xf1b2;</Text>}
                            ]
                    }
                />
            <ScrollView style={{flex:1}}>
                        <Components.ListNavigator
                        icons={[
                            {text:<Text>&#xf004;</Text>,label:'个人资料'},
                            [
                                {text:<Text>&#xf019;</Text>,label:'系统更新'},
                                {text:<Text>&#xf1b2;</Text>,label:'关于系统'}
                            ]
                        ]}
                       />
              </ScrollView>
          </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});