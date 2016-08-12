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
    Image,
    ListView
} from 'react-native';
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            info:""
        };
    },
    jump(name,info){
        if(this.props.navigator){
            this.props.navigator.push({name:name,info:info});
        }
    },
    render() {
        return (
            <View style={{flex:1}}>
                <Components.MD.Toolbar
                    style={{elevation:1}}
                    icon="arrow-back"
                    theme="dark"
                    title={"二维码开发测试"}
                />
                <Components.MD.Button
                    raised={true}
                    text="生成二维码"
                    onPress={()=>{
                        Components.QRCode.createQRCode(500,500,(isOk)=>{
                            this.setState({info:isOk})
                        })
                    }}
                />
                <Components.MD.Button
                    raised={true}
                    text="扫描二维码"
                    onPress={()=>{
                        Components.QRCode.scanQRCode((isOk)=>{
                            //this.setState({info:"this is:"+isOk})
                            //if(isOk)
                              //this.jump('qrcodeResult',isOk);
                        })
                    }}
                />
            </View>
        );
    },
    componentDidMount() {

    }
});