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
    Dimensions,
    DrawerLayoutAndroid
} from 'react-native';
import Components from '../../components';
import IndexComponents from './indexComponents'
import IndexMap from './indexMap'
import IndexSetting from './indexSetting'
import Environment from "../../environment";
import Message from "../../message";
var SystemInfo=NativeModules.SystemInfoAndroid;

module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
            isNeedUpdate:false
        };
    },
    getIsNeedUpdate(){
        if(!this.state.isNeedUpdate) {
            SystemInfo.getIsNeedUpdate(function (newVersionName) {
                this.setState({isNeedUpdate: newVersionName ? true : false, newVersionName: newVersionName});
            }.bind(this));
        }
    },
    handleUpdate(){
        if(this.state.isNeedUpdate){
            Alert.alert(
                '',
                '确定要升级到最新版本('+this.state.newVersionName+')吗？',
                [
                    {text: '取消', onPress: () => console.log('Cancel Pressed')},
                    {text: '确定', onPress: () => console.log('OK Pressed')}
                ]
            );
        };
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    openDrawer(){
        this.drawer.openDrawer(0);
    },
    render() {
        /*
        var navigationView = (
            <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#fff',paddingTop:Environment.IMMERSE_OFFSET}}>
                <Components.ListNavigator
                    icons={[
                        [
                            {text:<Text>&#xf004;</Text>,label:'首选项'},
                            {
                                text:<Text>&#xf019;</Text>,
                                label:'软件升级',
                                rightComponent:<View style={{flexDirection:'row',alignItems:'center'}}>
                                    {this.state.isNeedUpdate? <Components.Icon
                                        text={<Text>&#xf111;</Text>}
                                        size={8}
                                        color="#ff0000"
                                        margin={5}
                                    />:null}
                                    <Text>{Environment.APP_VERSION_NAME}</Text>
                                </View>,
                                action:this.handleUpdate
                            },
                            {text:<Text>&#xf1b2;</Text>,label:'关于采集录入系统',action:()=>this.jump("about")}
                        ]
                    ]}
                />
            </ScrollView>
        );*/
        var navigationView=(
            <Components.MD.Drawer>
                <Components.MD.Drawer.Header/>
                <Components.MD.Drawer.Section
                    title="波波维奇"
                    items={[
                        {icon:'add', iconColor:'#ff0000',value:'首选项'},
                        {icon:'add', value:'系统升级', label:Environment.APP_VERSION_NAME},
                        {icon:'add', value:'关于采集助手',onPress:()=>this.jump("about")}
                    ]}
                />
            </Components.MD.Drawer>
            );
        return (
            <DrawerLayoutAndroid
                ref={(drawer)=>this.drawer=drawer}
                drawerWidth={Dimensions.get('window').width-60}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
                onDrawerOpen={()=>this.drawerOpened=true}
                onDrawerClose={()=>this.drawerOpened=false}
            >
              <Components.FlexLayout>
                  <Components.MD.Toolbar
                      icon="menu"
                      theme="dark"
                      title="采集录入系统"
                      onIconPress={this.openDrawer}
                  />
                <Components.BottomNavigator
                    scrollEnabled={false}
                    icons={[
                        {text:<Text>&#xf015;</Text>,label:'首页'},
                        {text:<Text>&#xf279;</Text>,label:'地图'}
                    ]}
                >
                    <View><IndexComponents  navigator={this.props.navigator}/></View>
                    <View><IndexSetting navigator={this.props.navigator}/></View>
                </Components.BottomNavigator>
              </Components.FlexLayout>
            </DrawerLayoutAndroid>
        );
    },
    componentDidMount() {
        SystemInfo.setFullScreen(false);
        Message.handleMessage("index",(msg)=>{
            if(msg.what=="closeDrawer"){
                if(msg.handler)
                    msg.handler(this.drawerOpened)
                this.drawer.closeDrawer(0);
            }
        });
    }
});