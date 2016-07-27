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
    Dimensions
} from 'react-native';
import Environment from "../../environment";
import Components from '../../components';
module.exports=React.createClass({
    getInitialState(){
        return {
            viewPage:0,
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
        var mediaWidth=Dimensions.get('window').width-28;
        return (
            <Components.FlexLayout>
                <Components.NavigatorBar
                    title="关于采集录入系统"
                    alignCenter={false}
                    leftBtn={{text:<Text>&#xf104;</Text>,action:()=>this.pop()}}
                />
                <View style={{flex:1,paddingTop:8}}>
                    <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
                        <View style={{alignItems:'center',marginTop:14}}>
                            <Components.Icon
                               source={{uri:'icon1'}}
                               size={64}
                               borderRadius={15}
                            />
                        </View>
                        <View style={{alignItems:'center',marginTop:14}}>
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16}}>采集录入系统</Text>
                        </View>
                        <View style={{alignItems:'center',margin:14}}>
                            <Text style={{color:'#000',fontSize:14}}>采集录入系统是浙江省地质调查院的野外信息采集与记录平台，主要面向在野外地质勘测人员，记录勘测信息，并支持后期的数据导出与整理工作。旨在利用移动APP引进新的信息录入模式，提供工作效率。</Text>
                        </View>
                        <View style={{alignItems:'center',marginTop:14}}>
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:14}}>版本：{Environment.APP_VERSION_NAME}</Text>
                        </View>
                        <View style={{paddingTop:14,paddingBottom:14}}>
                            <Components.MediaPlayer.Video
                                style={{width: mediaWidth, height: mediaWidth/(16/9)}}
                                src={'http://v.yoai.com/femme_tampon_tutorial.mp4'}
                                autoplay={false}
                                preload={'none'}
                                loop={false}
                                controls={true}
                                muted={false}
                                poster={'http://static.yoaicdn.com/shoppc/images/cover_img_e1e9e6b.jpg'}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Components.FlexLayout>
        );
    },
    componentDidMount() {

    }
});