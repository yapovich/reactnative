/**
 * Created by yebo on 2016/7/14.
 * 底部导航复合组件
 */
import React,{ Component } from 'react';
import {
    Text,
    Image,
    View,
    ScrollView,
    ViewPagerAndroid,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import Icon from './Icon';
import {ListNavigatorStyle} from '../stylesheets/componentStyle';
class ListNavigator extends Component {
    constructor(props){
        super(props);
        this.handlePageSelect=this.handlePageSelect.bind(this);
        this.handleViewPageSelected=this.handleViewPageSelected.bind(this);
        this.state={
            viewPage:0
        }
    }
    handleViewPageSelected(e){
        this.setState({viewPage: e.nativeEvent.position});
    }
    handlePageSelect(page) {
        /*
        if (this.props.animationEnabled)
            this.viewPager.setPage(page);
        else
            this.viewPager.setPageWithoutAnimation(page);
        this.setState({viewPage: page});*/
    }
    render() {
        var groupBtns;
        var isTop=true;
        var getComponent=function(_this,value,index,hasBorder){
            if(value.length){
                return value.map(function(v,i){
                   return  getComponent(_this,v,i,i<value.length-1?true:false);
                });
            }
            var _wrapperStyle = {
                marginTop:isTop?14:0,
                marginBottom:hasBorder?0:14,
                backgroundColor: _this.props.backgroundColor?_this.props.backgroundColor:(ListNavigatorStyle.backgroundColor?ListNavigatorStyle.backgroundColor:'#fff'),
            }
            var _style = {
                paddingLeft:14,
                paddingRight:14,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }
            var _borderStyle={
                padding:8,
                paddingLeft:5,
                paddingRight:5,
                minHeight:48,
                flex:1,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: _this.props.borderColor?_this.props.borderColor:(ListNavigatorStyle.borderColor?ListNavigatorStyle.borderColor:'#eee'),
                borderStyle: 'solid',
                borderBottomWidth:hasBorder?1:0
            }
            isTop=false;
            var color = ListNavigatorStyle.color ? ListNavigatorStyle.color : null;
            var subColor = ListNavigatorStyle.subColor ? ListNavigatorStyle.subColor : null;
            var labelColor = value.labelColor ? value.labelColor : (_this.props.labelColor ? _this.props.labelColor : color);
            var sublabelColor = value.sublabelColor ? value.sublabelColor : (_this.props.sublabelColor ? _this.props.sublabelColor : subColor);
            var iconColor = value.iconColor ? value.iconColor : (_this.props.iconColor ? _this.props.iconColor : color);
            var size = value.iconSize ? value.iconSize : 16;
            var btn = value.text ?
                <Icon size={size} color={iconColor} text={value.text}/> :
                <Icon size={size} source={value.source}/>
            var label = <Text style={{
                marginLeft: 14,
                fontSize: value.labelSize?value.labelSize:14,
                color: labelColor
            }}>{value.label}</Text>
            var sublabel = value.sublabel?<Text style={{
                marginTop:5,
                marginLeft: 14,
                fontSize: 12,
                color: sublabelColor
            }}>{value.sublabel}</Text>:null;
            var labels=<View>{label}{sublabel}</View>
            return <View  key={"thlist_"+index} style={_wrapperStyle}>
                <TouchableHighlight
                    style={{flex:1}}
                    underlayColor={ListNavigatorStyle.hoverColor?ListNavigatorStyle.hoverColor:'#333'}
                    onPress={()=>value.action ? value.action() : null}>
                    <View style={_style}>
                        <View style={_borderStyle}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>{btn}{labels}</View>
                            <View>{value.rightComponent}</View>
                         </View>
                    </View>
                </TouchableHighlight>
            </View>
        }
        if (this.props.icons && this.props.icons.length > 0) {
            groupBtns = this.props.icons.map(function (value, index) {
                 return getComponent(this,value,index);
            }.bind(this));
        }
        return (
            <View>
                {groupBtns}
            </View>
        )
    }
}
module.exports=ListNavigator;