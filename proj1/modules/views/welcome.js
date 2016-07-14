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
    Image,
    TouchableHighlight
} from 'react-native';
import {WelcomeStyle} from '../styles';
class welcome extends Component {
    render() {
        return (
                <Image style={WelcomeStyle.container} source={{uri: 'bg'}}>
                    <Text style={WelcomeStyle.mainTitle}>浙江省地质调查院</Text>
                    <Text style={WelcomeStyle.subTitle}>野外采集录入系统 v1.0</Text>
                    <View style={WelcomeStyle.btns}>
                        <TouchableHighlight  style={WelcomeStyle.comeinBtn} onPress={this.props.onPress}>
                            <Text style={WelcomeStyle.comeinText}>进入系统3</Text>
                        </TouchableHighlight>
                    </View>
                </Image>
        );
    }
}
module.exports=welcome;