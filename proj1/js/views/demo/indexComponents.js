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
                                iconSize:64,
                                source:{uri:'icon1'},
                                label: '叶波',
                                sublabel:'海康威视研究院/大数据技术部'
                            },
                            {text:<Text>&#xf004;</Text>,label:'字体图标'},
                            [
                                {text:<Text>&#xf002;</Text>,label:'表单控件',action:()=>this.jump('examples_form')}
                            ],
                            {text:<Text>&#xf004;</Text>,label:'网格导航器',action:()=>this.jump('examples_gridNavigator')},
                            {text:<Text>&#xf004;</Text>,label:'图标工具栏'},
                            {text:<Text>&#xf004;</Text>,label:'滚动广告板'},
                            {text:<Text>&#xf004;</Text>,label:'标签栏'}
                        ]}
                       />
              </ScrollView>
        );
    },
    componentDidMount() {

    }
});