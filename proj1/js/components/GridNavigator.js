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
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import Icon from './Icon';
import {GridNavigatorStyle} from '../stylesheets/componentStyle';
class GridNavigator extends Component {
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
        if(this.props.icons&&this.props.icons.length>0){
            var c=this.props.column?this.props.column:4;
            var r=this.props.row?this.props.row:Math.floor((this.props.icons.length+c-1)/c);
            var columns=[];
            var rows=[];
            for(var i=0;i<c;i++)
                columns.push(i);
            for(var i=0;i<r;i++)
                rows.push(i);
            var total=this.props.icons.length;
            var count=0;
            groupBtns=rows.map(function(g,index1){
                            return <View style={{flexDirection:'row',flex:1}} key={"bnto_" + count}>
                                {
                                    columns.map(function (g, index2) {
                                        count++;
                                        var brw=((index2+1)%c==0)?0:1;
                                        var borderColor=this.props.borderColor?this.props.borderColor:(GridNavigatorStyle.borderColor?GridNavigatorStyle.borderColor:'#eee')
                                        var paddingAndMargin={
                                            paddingTop: 18,
                                            paddingBottom: 18,
                                        }
                                        if(this.props.space&&!isNaN(this.props.space)){
                                            paddingAndMargin={
                                                paddingTop: 18-this.props.space,
                                                paddingBottom: 18-this.props.space,
                                                marginTop: this.props.space,
                                                marginBottom: this.props.space,
                                            }
                                        }
                                        var _style={
                                            alignItems: 'center',
                                            justifyContent:'center',
                                            flex: 1,
                                            borderColor:borderColor,
                                            borderStyle: 'solid',
                                            borderRightWidth: brw
                                        }
                                        var _borderStyle={
                                            flex:1,
                                            backgroundColor: this.props.backgroundColor?this.props.backgroundColor:(GridNavigatorStyle.backgroundColor?GridNavigatorStyle.backgroundColor:'#fff'),
                                            borderColor: this.props.borderColor?this.props.borderColor:(GridNavigatorStyle.borderColor?GridNavigatorStyle.borderColor:'#eee'),
                                            borderStyle: 'solid',
                                            borderRightWidth: 0,//brw,
                                            borderBottomWidth: 1,
                                            borderTopWidth:index1==0?1:0
                                        }
                                        if (count > total)
                                            return <View key={"bnto_" + count} style={_borderStyle}></View>;
                                        var value=this.props.icons[count-1];
                                        var color = GridNavigatorStyle.color ? GridNavigatorStyle.color : null;
                                        var labelColor=value.labelColor?value.labelColor:(this.props.labelColor?this.props.labelColor:color);
                                        var iconColor=value.iconColor?value.iconColor:(this.props.iconColor?this.props.iconColor:color);
                                        var size=value.size?value.size:(this.props.size?this.props.size:24);
                                        var btn = value.text ?
                                            <Icon size={size} color={iconColor} text={value.text}/> :
                                            (value.source?<Icon size={size} source={value.source}/>:null)
                                        var label = <Text style={{
                                            marginTop: 5,
                                            fontSize: 10,
                                            color: labelColor
                                        }}>{value.label}</Text>
                                        return <View style={_borderStyle} key={"bnto_" + count}>
                                          <TouchableHighlight
                                              style={{flex:1}}
                                            underlayColor={GridNavigatorStyle.hoverColor?GridNavigatorStyle.hoverColor:'#333'}
                                            onPress={()=>value.action?value.action():null}>
                                            <View style={[_style,paddingAndMargin]}>{btn}{label}</View>
                                          </TouchableHighlight>
                                        </View>
                                    }.bind(this))
                                }
                                </View>
                        }.bind(this))
        }
        return (
            <View>
                  {groupBtns}
            </View>
        )
    }
}
module.exports=GridNavigator;