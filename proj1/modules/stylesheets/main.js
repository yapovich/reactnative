/**
 * Created by yebo on 2016/7/8.
 */
import {StyleSheet} from 'react-native';
module.exports= {
    mainStyle: StyleSheet.create({
        //包装
        wrapper: {
            flex: 1
        },
        content:{
            flex:1,
            paddingLeft:20,
            paddingRight:20
        },
        backToolbar:{
           height:48,
           borderColor: '#ccc',
           borderStyle: 'solid',
           borderBottomWidth:1,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'flex-start'
        },
        bottomBar:{
            height:48,
            borderColor: '#ccc',
            borderStyle: 'solid',
            borderTopWidth:1,
            flexDirection:'row',
            justifyContent:'space-around'
        },
        bottomBarBtn:{
            width:48,
            height:48,
            alignItems:'center',
            justifyContent:'center'
        },
        textInputWrapper:{
            height: 40,
            borderRadius: 5,
            borderColor: '#ccc',
            borderStyle: 'solid',
            borderWidth: 1,
            marginTop:10,
            marginBottom:10,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            padding:5
        },
        textInput:{
            flex:1,
            height:38,
            borderWidth: 0
        },
        bar:{
            padding:20,
            paddingTop:10
        },
        saveBtn:{
            flex:1,
            borderWidth: 1,
            borderColor: '#fff',
            borderStyle: 'solid',
            borderRadius: 5,
            padding:13,
            backgroundColor:'#01bfa5',
            alignItems:'center'
        },
        saveText:{
            color:'#fff',
            fontSize:14
        }
    }),
    welcomeStyle: StyleSheet.create({
        //欢迎页容器
        welcome_container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },
        //欢迎页主标题
        welcome_mainTitle: {
            fontSize: 40,
            marginTop: 100,
            color: '#fff'
        },
        //欢迎页副标题
        welcome_subTitle: {
            fontSize: 20,
            marginBottom: 10,
            color: '#fff'
        },
        //欢迎页按钮容器
        welcome_btns: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 60
        },
        //欢迎页进入按钮
        welcome_comeinBtn:{
            borderWidth: 1,
            borderColor: '#fff',
            borderStyle: 'solid',
            borderRadius: 5,
            padding:10
        },
        //欢迎页进入按钮
        welcome_comeinText:{
            color:'#fff',
            fontSize:18
        }
    })
}
