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
        wrapper_gray: {
            flex: 1,
            backgroundColor:'#d5d5d5'
        },
        content:{
            flex:1,
            paddingLeft:20,
            paddingRight:20
        },
        toolbar:{
           height:48,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'space-between',
           backgroundColor:'#109d59'
        },
        toolbarNav:{
            height:48,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start'
        },
        toolbarNavIcon:{
            width:48,
            height:48,
            padding:12
        },
        toolbarNavFont:{
            color:'#fff',
            textAlign:'center',
            fontFamily: 'fontawesome',
            fontSize:24
        },
        toolbarTitle:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        toolbarTitleText:{
            fontSize:18,
            color:'#fff',
            marginLeft:14
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
        bottomBarBtnIcon:{
            fontFamily: 'fontawesome',
            fontSize:20
        },
        bottomBarBtnText:{
            fontSize:12,
            marginTop:1
        },
        bottomBarBtnIconSelected:{
            fontFamily: 'fontawesome',
            fontSize:20,
            color:'#109d59'
        },
        bottomBarBtnTextSelected:{
            fontSize:12,
            marginTop:1,
            color:'#109d59'
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
            borderRadius: 2,
            padding:5,
            paddingLeft:13,
            paddingRight:13,
            marginRight:14,
            backgroundColor:'#45c01a',
            alignItems:'center'
        },
        saveText:{
            color:'#fff',
            fontSize:12
        },
        blockListItemFirst:{
            backgroundColor:'#fff',
            marginTop:10,
            marginBottom:10,
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            padding:10,
            paddingLeft:14
        },
        blockListItem:{
            backgroundColor:'#fff',
            marginBottom:10,
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            padding:12,
            paddingLeft:14
        },
        blockListItemFont:{
            marginRight:14,
            color:'#ddd',
            textAlign:'center',
            fontFamily: 'fontawesome',
            fontSize:24
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
