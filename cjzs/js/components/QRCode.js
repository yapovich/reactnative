/**
 * Created by yebo on 2016/8/11.
 */
import React,{ PropTypes } from 'react';
import {
    View,
    requireNativeComponent
}from 'react-native';

var iface = {
    name: 'RCTQRCodeAndroid',
    propTypes: {
        ...View.propTypes,
        animation:PropTypes.bool
    }
};
module.exports = requireNativeComponent('RCTQRCodeAndroid', iface);