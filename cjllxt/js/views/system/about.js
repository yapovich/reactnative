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
                                src={'http://124.232.144.156/vhot2.qqvideo.tc.qq.com/o0302l9gyu9.mp4?vkey=F5492AE0B73EBF42CB0BC773A600BC63C61F8553B1CDD6DCA1B6A34DD44B8BE6EB10D9B1218C3722746C11B911655CA1A21268CAAAAD5B1400F8DBCAA32242CB0FA5F8161130EE3912712EF6B7206D139F9A833923C06624FBFC75D81B38C278&br=62103&platform=1&fmt=mp4&level=0&type=mp4'}
                                autoplay={false}
                                preload={'auto'}
                                loop={false}
                                controls={true}
                                muted={false}
                                poster=""
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