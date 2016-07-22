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
    View,
    Image
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
                    title="自动播放广告板"
                    alignCenter={false}
                    leftBtn={{
                        text:<Text>&#xf060;</Text>,
                        action:()=>(this.props.navigator?this.props.navigator.pop():null)}}
                />
                <Components.AutoPlayBanner style={{height:100}}>
                    <View style={{backgroundColor:'#eeeeee'}}>
                        <Image source={{uri:'icon1'}}/>
                    </View>
                    <View style={{backgroundColor:'#cccccc'}}>
                        <Image source={{uri:'icon1'}}/>
                    </View>
                    <View style={{backgroundColor:'#999999'}}>
                        <Image source={{uri:'icon1'}}/>
                    </View>
                </Components.AutoPlayBanner>

            </Components.FlexLayout>
        );
    }
});