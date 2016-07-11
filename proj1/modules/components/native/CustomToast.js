/**
 * Created by yebo on 2016/7/11.
 */
import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';
var iface = {
    name: 'CustomToast',
    propTypes: {
        ...View.propTypes // include the default view properties
    }
};
module.exports = requireNativeComponent('RCTToast', iface);