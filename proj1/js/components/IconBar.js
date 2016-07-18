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
import {IconBarStyle} from '../stylesheets/componentStyle';
class BottomNavigator extends Component {
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
            borderColor: IconBarStyle.borderColor?IconBarStyle.borderColor:"#ccc",
            borderStyle:  IconBarStyle.borderStyle?IconBarStyle.borderStyle:"solid",
            borderTopWidth: IconBarStyle.borderTopWidth?IconBarStyle.borderTopWidth:0,
            borderBottomWidth: IconBarStyle.borderBottomWidth?IconBarStyle.borderBottomWidth:0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center',
            backgroundColor: IconBarStyle.backgroundColor?IconBarStyle.backgroundColor:'#fff'
        }

        var btns=null;
        if(this.props.icons){
           btns=<View style={iconBarStyle}>
               {
                   this.props.icons.map(function (g, index) {
                       var isEnabled=(g.enabled==undefined||g.enabled==true)?true:false;
                       var color=isEnabled?IconBarStyle.color:IconBarStyle.disabledColor;
                       var btn = g.text ?
                           <Icon size={20} color={color} text={g.text}/> :
                           <Icon size={20} source={g.source}/>
                       var label = <Text style={{
                           marginTop: 3,
                           fontSize: 10,
                           color:color
                       }}>{g.label}</Text>
                       if(isEnabled)
                       return (<TouchableOpacity key={"bnto_" + index} activeOpacity={0.5}
                                                 onPress={g.action}>
                           <View  style={{alignItems: 'center'}}>{btn}{label}</View>
                       </TouchableOpacity>);
                       else
                           return (<View key={"bnv_" + index}  style={{alignItems: 'center'}}>{btn}{label}</View>)
                   }.bind(this))
               }</View>
        }
        return (
            <View>
                  {btns}
            </View>
        )
    }
}
module.exports=BottomNavigator;