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
import {welcomeStyle} from '../stylesheets/main';
class welcome extends Component {
    render() {
        return (
                <Image style={welcomeStyle.welcome_container} source={{uri: 'bg'}}>
                    <Text style={welcomeStyle.welcome_mainTitle}>浙江省地质调查院</Text>
                    <Text style={welcomeStyle.welcome_subTitle}>野外采集录入系统 v1.0</Text>
                    <View style={welcomeStyle.welcome_btns}>
                        <TouchableHighlight  style={welcomeStyle.welcome_comeinBtn} onPress={this.props.onPress}>
                            <Text style={welcomeStyle.welcome_comeinText}>进入系统3</Text>
                        </TouchableHighlight>
                    </View>
                </Image>
        );
    }
}
module.exports=welcome;