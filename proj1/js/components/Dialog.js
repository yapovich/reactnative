/**
 * Created by yebo on 2016/7/14.
 * 正方形字体或图片图标
 */
import React,{ Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
module.exports={
    //确认对话框
    confirm(msg,okAction,cancelAction){
        var style1={
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
        var style2={
            padding:5,
            margin: 20,
            borderRadius: 5,
            backgroundColor: '#fff',
        }
        var style3={
            minHeight: 100,
            padding:8,
            borderBottomWidth:1,
            borderStyle:'solid',
            borderColor:'#ccc',
            justifyContent: 'center',
            alignItems:'center'
        }
        var style4={
            flex:1,
            height:40,
            justifyContent: 'center',
            alignItems:'center'
        }
        var style5={
            flex:1,
            height:40,
            borderLeftWidth:1,
            borderStyle:'solid',
            borderColor:'#ccc',
            justifyContent: 'center',
            alignItems:'center'
        }
        var modelComponent=(<View style={style1}>
                <View style={style2}>
                    <View style={style3}>
                        <Text style={{textAlign: 'center',fontSize:14,color:'#666'}}>{msg}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight style={{flex:1}} underlayColor="#ddd" onPress={cancelAction}>
                            <View style={style4}>
                                <Text style={{fontSize:14,color:'#ff0000'}}>取消</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{flex:1}} underlayColor="#ddd" onPress={okAction}>
                            <View style={style5}>
                                <Text style={{fontSize:14,color:'#109d59'}}>确定</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
        return modelComponent;
    }
}