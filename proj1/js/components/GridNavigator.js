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
        var style={
            flex:1,
            backgroundColor: GridNavigatorStyle.backgroundColor?GridNavigatorStyle.backgroundColor:'#fff'
        }

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
            groupBtns=rows.map(function(g,index){
                            return <View style={{flexDirection:'row',flex:1}} key={"bnto_" + count}>
                                {
                                    columns.map(function (g, index) {
                                        count++;
                                        var brw=((index+1)%c==0)?0:1;
                                        var _style={
                                            alignItems: 'center',
                                            justifyContent:'center',
                                            flex: 1,
                                            paddingTop: 20,
                                            paddingBottom: 20
                                        }
                                        var _borderStyle={
                                            flex:1,
                                            borderColor: GridNavigatorStyle.solidColor?GridNavigatorStyle.solidColor:'#eee',
                                            borderStyle: 'solid',
                                            borderRightWidth: brw,
                                            borderBottomWidth: 1
                                        }
                                        if (count > total)
                                            return <View key={"bnto_" + count} style={_borderStyle}></View>;
                                        var value=this.props.icons[count-1];
                                        var color = GridNavigatorStyle.color ? GridNavigatorStyle.color : null;
                                        var size=value.size?value.size:24;
                                        var btn = value.text ?
                                            <Icon size={size} color={color} text={value.text}/> :
                                            <Icon size={size} source={value.source}/>
                                        var label = <Text style={{
                                            marginTop: 3,
                                            fontSize: 10,
                                            color: color
                                        }}>{value.label}</Text>
                                        return <View style={_borderStyle} key={"bnto_" + count}>
                                          <TouchableHighlight
                                            underlayColor={GridNavigatorStyle.hoverColor?GridNavigatorStyle.hoverColor:'#333'}
                                            onPress={()=>value.action?value.action():null}>
                                            <View style={_style}>{btn}{label}</View>
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