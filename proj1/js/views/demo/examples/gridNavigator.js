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
                        column={4}
                        size={24}
                        icons={[
                            {text:<Text>&#xf001;</Text>,label:'首页'},
                            {text:<Text>&#xf002;</Text>,label:'地图'},
                            {text:<Text>&#xf003;</Text>,label:'首页'},
                            {text:<Text>&#xf004;</Text>,label:'地图'},
                            {text:<Text>&#xf105;</Text>,label:'首页'},
                            {text:<Text>&#xf006;</Text>,label:'地图'},
                            {text:<Text>&#xf107;</Text>,label:'首页'},
                            {text:<Text>&#xf008;</Text>,label:'地图'},
                            {text:<Text>&#xf209;</Text>,label:'首页'},
                            {text:<Text>&#xf017;</Text>,label:'地图'},
                            {text:<Text>&#xf011;</Text>,label:'首页'},
                            {text:<Text>&#xf112;</Text>,label:'地图'},
                            {text:<Text>&#xf013;</Text>,label:'首页'},
                            {text:<Text>&#xf014;</Text>,label:'地图'},
                            {text:<Text>&#xf015;</Text>,label:'首页'},
                            {text:<Text>&#xf016;</Text>,label:'地图'},
                            {text:<Text>&#xf217;</Text>,label:'首页'},
                            {text:<Text>&#xf018;</Text>,label:'地图'},
                            {text:<Text>&#xf019;</Text>,label:'首页'},
                            {text:<Text>&#xf020;</Text>,label:'地图'},
                            {text:<Text>&#xf021;</Text>,label:'首页'},
                            {text:<Text>&#xf022;</Text>,label:'地图'},
                            {text:<Text>&#xf023;</Text>,label:'首页'},
                            {text:<Text>&#xf024;</Text>,label:'地图'},
                            {text:<Text>&#xf24a;</Text>,activeText:<Text>&#xf249;</Text>,label:'便签'},
                            {text:<Text>&#xf013;</Text>,label:'配置'}
                        ]}
                    />
                </ScrollView>
            </Components.FlexLayout>
        );
    }
});