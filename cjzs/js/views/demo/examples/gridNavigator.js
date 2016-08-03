/**
 * Created by yebo on 2016/7/8.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{ Component} from 'react';
import {
    Text,
    ScrollView
} from 'react-native';
import Components from '../../../components';
module.exports=React.createClass({
    getInitialState() {
        return null;
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="网格导航器"
                    alignCenter={false}
                    leftBtn={{
                        text:<Text>&#xf060;</Text>,
                        action:()=>(this.props.navigator?this.props.navigator.pop():null)}}
                />
                <ScrollView>
                    <Components.GridNavigator
                        border={0}
                        space={0}
                        column={5}
                        rows={4}
                        size={40}
                        icons={[
                            {text:<Text>&#xf001;</Text>,label:'首页'},
                            {text:<Text>&#xf002;</Text>,label:'地图'},
                            {text:<Text>&#xf001;</Text>,label:'首页'},
                            {text:<Text>&#xf002;</Text>,label:'地图'},
                            {text:<Text>&#xf001;</Text>,label:'首页'},
                            {text:<Text>&#xf002;</Text>,label:'地图'},
                            {text:<Text>&#xf24a;</Text>,activeText:<Text>&#xf249;</Text>,label:'便签'},
                            {text:<Text>&#xf013;</Text>,label:'配置'}
                        ]}
                    />
                </ScrollView>
            </Components.FlexLayout>
        );
    }
});