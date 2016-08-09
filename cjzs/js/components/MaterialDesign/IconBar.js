/**
 * Created by yebo on 2016/7/14.
 * 底部导航复合组件
 */
import React,{ Component } from 'react';
import {
    Text,
    Image,
    View,
    ViewPagerAndroid,
    TouchableOpacity
} from 'react-native'
import Icon from './Icon';
var MD=require('./index');
export default class IconBar extends Component {
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
        if (this.props.animationEnabled)
            this.viewPager.setPage(page);
        else
            this.viewPager.setPageWithoutAnimation(page);
        this.setState({viewPage: page});
    }
    render() {
        var iconBarStyle={
            height: 48,
            borderColor: "#eee",
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth:0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center',
            backgroundColor:'#fff'
        }
        var unitStyle={
            alignItems: 'center',
            justifyContent:'center',
            height:48,
            flex:1
        }
        var btns=null;
        if(this.props.items){
           btns= this.props.items.map(function (g, index) {
                       var isEnabled=(g.enabled==undefined||g.enabled==true)?true:false;
                       var color=isEnabled?MD.getColor("googleGrey"):MD.getColor("googleGrey300");
                       var btn = g.name ?
                           <Icon color={color} name={g.name}/> :
                           <Image style={{width:16,height:16}} source={g.source}/>
                       var label = <Text style={{
                           marginTop: 0,
                           fontSize: 10,
                           color:color
                       }}>{g.label}</Text>
                       if(isEnabled)
                       return (<MD.Ripple
                           key={"bnr_" + index}
                           onPress={g.action}
                           style={{flex:1}}
                       >
                           <View  style={unitStyle}>{btn}{label}</View>
                       </MD.Ripple>);
                       else
                           return (<View key={"bnv_" + index}  style={unitStyle}>{btn}{label}</View>)
                   }.bind(this));
        }
        return (
            <View style={iconBarStyle}>
                  {btns}
            </View>
        )
    }
}