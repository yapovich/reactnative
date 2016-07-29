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
import IndexComponents from './indexComponents'
import IndexSetting from './indexSetting'
var SystemInfo=NativeModules.SystemInfoAndroid;
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
            slidingMenuStatus:0
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    showSlidingMenu(){
        if(this.state.slidingMenuStatus==0||this.state.slidingMenuStatus==2)
          this.setState({slidingMenuStatus:1})
        else
          this.setState({slidingMenuStatus:2})
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.SlidingMenu
                    ref={(slidingMenu)=>this.slidingMenu=slidingMenu}
                    visible={this.state.slidingMenuStatus?true:false}
                >
                </Components.SlidingMenu>
                <Components.NavigatorBar
                    title={"采集录入系统"}
                    alignCenter={false}
                    leftBtn={{text:<Text>&#xf0c9;</Text>,action:this.showSlidingMenu}}
                />
                <Components.BottomNavigator
                    scrollEnabled={false}
                    icons={[
                        {text:<Text>&#xf015;</Text>,label:'首页'},
                        {text:<Text>&#xf013;</Text>,label:'配置'}
                    ]}
                >
                    <View><IndexComponents  navigator={this.props.navigator}/></View>
                    <View><IndexSetting navigator={this.props.navigator}/></View>
                </Components.BottomNavigator>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {
        SystemInfo.setFullScreen(false);
    }
});