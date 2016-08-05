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
    Alert,
    NativeModules
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            showMenu:false
        };
    },
    pop(){
        if(this.props.navigator){
            this.props.navigator.pop();
        }
    },
    jump(name){
        if(this.props.navigator){
            this.props.navigator.push({name:name});
        }
    },
    render() {
        return (
            <Components.FlexLayout>
                <Components.MD.Toolbar
                    style={{elevation:1}}
                    icon="arrow-back"
                    theme="dark"
                    title={this.props.title}
                    onIconPress={()=>this.pop()}
                    actions={[
                        /*{icon:'add',onPress:()=>this.jump("update")}*/
                    ]}
                />
                <Components.MD.AvatarNavigator index={0} visible={true}
                                               backgroundColor='googleGrey'
                                               name={this.state.showMenu?"keyboard-arrow-down":"keyboard-arrow-up"}
                                               onPress={()=>this.setState({showMenu:!this.state.showMenu})}/>
                <Components.MD.AvatarNavigator index={1} visible={this.state.showMenu}
                                               backgroundColor='googleGreen'
                                               name="grid-on"
                                               onPress={()=>this.jump("update")}/>
                <Components.MD.AvatarNavigator index={2} visible={this.state.showMenu}
                                               name="add"
                                               onPress={()=>this.jump("update")}/>
                <ScrollView contentContainerStyle={{backgroundColor:'#fff'}}>
                    <Text>波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇</Text>
                    <Text>波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇</Text>
                    <Text>波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇波波维奇</Text>
                </ScrollView>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});