/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';
var iface = {
    name: 'WheelView',
    propTypes: {
        items: PropTypes.string,
        ...View.propTypes // include the default view properties
    }
};
module.exports = requireNativeComponent('WheelViewAndroid', iface);