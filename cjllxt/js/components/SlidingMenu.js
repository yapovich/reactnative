import React, {PropTypes} from 'react';
import ReactNative, {
    View,
    ScrollView,
    requireNativeComponent
} from 'react-native';

module.exports = requireNativeComponent('RCTSlidingMenuView', {
    name: 'RCTSlidingMenuView',
    propTypes: {
        visible:PropTypes.bool,
        ...ScrollView.propTypes
    }
});