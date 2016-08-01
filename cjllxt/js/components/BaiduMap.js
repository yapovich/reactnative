/**
 * Created by yebo on 2016/7/30.
 */
import React, {PropTypes} from 'react';
import ReactNative,{
    Text,
    View,
    requireNativeComponent
} from 'react-native';
module.exports = requireNativeComponent('RCTBaiduMapAndroid', {
    name: 'RCTBaiduMapAndroid',
    propTypes: {
        zoomEnabled:PropTypes.bool,
        ...View.propTypes
    }
});