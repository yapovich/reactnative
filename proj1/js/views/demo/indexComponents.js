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
                            {
                                iconSize:50,
                                source:{uri:'icon1'},
                                label: '叶波',
                                sublabel:'海康威视研究院/大数据技术部'
                            },
                            [
                                {text:<Text>&#xf002;</Text>,label:'文本输入框'},
                                {text:<Text>&#xf003;</Text>,label:'普通选择框'},
                                {text:<Text>&#xf003;</Text>,label:'时间选择框'},
                                {text:<Text>&#xf003;</Text>,label:'日期选择框'},
                                {text:<Text>&#xf003;</Text>,label:'单选框'},
                                {text:<Text>&#xf003;</Text>,label:'多选框'}
                            ],
                            {text:<Text>&#xf004;</Text>,label:'网格导航器',action:()=>this.jump('examples_gridNavigator')},
                            {text:<Text>&#xf004;</Text>,label:'图标'},
                            {text:<Text>&#xf004;</Text>,label:'图标工具栏'}
                        ]}
                       />
              </ScrollView>
        );
    },
    componentDidMount() {

    }
});