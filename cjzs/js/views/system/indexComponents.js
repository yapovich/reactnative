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
    ScrollView
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return null;
    },
    jump(name,title){
        if(this.props.navigator){
            this.props.navigator.push({name:name,title:title});
        }
    },
    render() {
        /*
         <Components.AutoPlayBanner
         style={{marginBottom:8}}
         delay={10000}
         scale={2}
         icons={[
         {source:{uri:'banner1'}},
         {source:{uri:'banner2'}},
         {source:{uri:'banner3'}},
         {source:{uri:'banner4'}},
         {source:{uri:'banner1'}}
         ]}/>
        */
        return (<ScrollView style={{flex:1}}>
                <Components.GridNavigator
                    border={1}
                    space={0}
                    column={4}
                    size={48}
                    icons={[
                        {text:<Text>&#xf261;</Text>,iconColor:"#f9a91e",label:'土壤地球化学',action:()=>this.jump('qrcode','土壤地球化学')},
                        {text:<Text>&#xf261;</Text>,iconColor:"#83cdf4",label:'其他采集主题',action:()=>this.jump('list','其他采集主题')},
                        {text:<Text>&#xf261;</Text>,iconColor:"#aecc12",label:'其他采集主题',action:()=>this.jump('list','其他采集主题')},
                        {text:<Text>&#xf261;</Text>,iconColor:"#fda380",label:'其他采集主题',action:()=>this.jump('list','其他采集主题')},
                        {text:<Text>&#xf261;</Text>,iconColor:"#ee5655",label:'其他采集主题',action:()=>this.jump('list','其他采集主题')},
                        {text:<Text>&#xf261;</Text>,iconColor:"#c855ee",label:'其他采集主题',action:()=>this.jump('list','其他采集主题')}
                    ]}
                />
              </ScrollView>
        );
    },
    componentDidMount() {

    }
});