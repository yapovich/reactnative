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
    TouchableOpacity
} from 'react-native'
import { TYPO, PRIMARY, COLOR, THEME_NAME, PRIMARY_COLORS } from './config';
import { getColor } from './helpers';
import {default as Ripple} from './Ripple';
import {default as Icon} from './Icon';
export default class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex:0
        };
    }

    static defaultProps = {
        theme:'dark'
    };
    render(){
       const {
            theme,
            items
       } = this.props;
        var comp= items&&items.length>0?items.map((g,index)=>{
            var isCurrent=index==this.state.currentIndex;
            return <Ripple
                key={"tbn_"+index}
                style={items.length<=5?{flex:1}:null}
                onPress={()=>{this.setState({currentIndex:index})}}
            >
                <View style={[styles.tabItem,items.length>5?{paddingHorizontal:15}:null,isCurrent?colorMap[theme]["active"]:null]}>
                    {
                        g.icon?
                            <Icon name={g.icon} size={20} color={isCurrent?colorMap[theme]["activeText"].color:colorMap[theme]["text"].color}/>
                            :<Text style={[isCurrent?colorMap[theme]["activeText"]:colorMap[theme]["text"]]}>{g.label}</Text>
                    }
                </View></Ripple>
        }):null;
        if(items&&items.length>5)
            return (
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                          style={{backgroundColor:colorMap[theme]["backgroundColor"]}}
                          contentContainerStyle={[styles.tabs,{backgroundColor:colorMap[theme]["backgroundColor"]}]}>
                  {comp}
              </ScrollView>);
           else
               return (
                   <View style={[styles.tabs,{backgroundColor:colorMap[theme]["backgroundColor"]}]}>
                       {comp}
                   </View>
               );
   }
}
const colorMap = {
    light: {
        text:{
            color:getColor("googleGrey")
        },
        activeText: {
            color:getColor(PRIMARY)
        },
        backgroundColor:'#fff',
        active:{
            borderBottomWidth:2,
            paddingBottom:0,
            borderColor:getColor(PRIMARY)
        }
    },
    dark: {
        text: {
            color:getColor(PRIMARY+"300")
        },
        activeText: {
            color:"#fff"
        },
        backgroundColor:getColor(PRIMARY),
        active:{
            borderBottomWidth:2,
            paddingBottom:0,
            borderColor:'#fff'
        }
    }
};
const styles = StyleSheet.create({
    tabs:{
        paddingHorizontal:16,
        height:48,
        flexDirection:'row',
        alignItems:'flex-start'
    },
    tabItem: {
        height:46,
        paddingBottom:2,
        borderStyle:'solid',
        justifyContent:'center',
        alignItems:'center'
    }
});