/**
 * Created by yebo on 2016/8/5.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    ViewPagerAndroid,
    TouchableOpacity,
    Animated
} from 'react-native'
import { default as Avatar } from './Avatar';
import { default as Ripple } from './Ripple';
export default class AvatarNavigator extends Component {
    static defaultProps = {
        index:0,
        backgroundColor:'paperPink'
    };
    constructor(props) {
        super(props);
        this.doAnimated=this.doAnimated.bind(this);
        this.state = {
            fadeAnim: new Animated.Value(0), // init opacity 0
            bottomAnim: new Animated.Value(16)
        };
    }
    render(){
        const {
            style,
            index,
            name,
            onPress,
            backgroundColor,
            visible
        }= this.props;
       return (
             <Animated.View
               style={[{position:'absolute',right:16,bottom:this.state.bottomAnim,zIndex:100-index},{opacity: this.state.fadeAnim}]}>
               <Ripple onPress={onPress}>
               <Avatar
                   style={{visible:visible}}
                   icon={name}
                   backgroundColor={backgroundColor}
               />
               </Ripple>
              </Animated.View>
       );
   }
    doAnimated(){
        if(this.props.visible){
            Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim,
                    {toValue: 1,duration:300}
                ),
                Animated.timing(
                    this.state.bottomAnim,
                    {toValue: this.props.index*56+16,duration:300}
                )
            ]).start();
        }else{
            Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim,
                    {toValue: 0,duration:300}
                ),
                Animated.timing(
                    this.state.bottomAnim,
                    {toValue: 16,duration:300}
                )
            ]).start();
        }
    }
    componentDidMount() {
        this.doAnimated();
    }

    componentDidUpdate() {
        this.doAnimated();
    }
}