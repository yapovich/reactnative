/**
 * Created by yebo on 2016/7/8.
 */
import {StyleSheet} from 'react-native';
module.exports= StyleSheet.create({
    //包装
    wrapper: {
        flex: 1
    },
    wrapper_gray: {
        flex: 1,
        backgroundColor: '#d5d5d5'
    },
    tipinfo: {
        padding: 12,
        margin: 12,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        borderRadius: 5
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff'
    },
    toolbar: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#109d59'
    },
    toolbarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    toolbarNav: {
        flex:1,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    toolbarNavIcon: {
        width: 48,
        height: 48,
        padding: 12
    },
    toolbarNavFont: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'fontawesome',
        fontSize: 24
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarTitleText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 12
    },
    toolbarTitleTextBorder: {
        flex:1,
        borderColor: '#0a7441',
        borderStyle: 'solid',
        borderLeftWidth: 1
    },
    bottomBar: {
        height: 48,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff'
    },
    bottomBarBtn: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBarBtnIcon: {
        fontFamily: 'fontawesome',
        fontSize: 20
    },
    bottomBarBtnText: {
        fontSize: 12,
        marginTop: 1
    },
    bottomBarBtnIconSelected: {
        fontFamily: 'fontawesome',
        fontSize: 20,
        color: '#109d59'
    },
    bottomBarBtnTextSelected: {
        fontSize: 12,
        marginTop: 1,
        color: '#109d59'
    },
    textInputWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInputBorder: {
        height: 40,
        borderRadius: 5,
        borderColor: '#109d59',
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },
    textInputLabel: {
        fontSize: 14
    },
    textInput: {
        flex: 1,
        height: 38,
        borderWidth: 0,
        textAlign: 'right',
        color: '#109d59',
        fontSize: 14
    },
    textInputRequiredText: {
        position: 'absolute',
        color: '#ff0000',
        fontSize: 12,
        margin: 12,
        marginLeft: 10
    },
    bar: {
        padding: 20,
        paddingTop: 10
    },
    saveBtn: {
        borderRadius: 2,
        padding: 5,
        paddingLeft: 13,
        paddingRight: 13,
        marginRight: 14,
        backgroundColor: '#45c01a',
        alignItems: 'center'
    },
    saveText: {
        color: '#fff',
        fontSize: 12
    },
    blockListItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 14,
        height: 48
    },
    blockListItemOver: {
        backgroundColor: '#f1f1f1'
    },
    blockListItemLeft: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    blockListItemLeftIcon: {
        width: 32,
        height: 32,
        marginRight: 12,
        borderRadius: 16
    },
    blockListItemLeftFont: {
        marginRight: 12,
        color: '#6e6e6e',
        textAlign: 'center',
        fontFamily: 'fontawesome',
        fontSize: 18
    },
    blockListItemLeftText: {
        fontSize: 18,
        color: '#6e6e6e'
    },
    blockListItemRightFont: {
        color: '#d0d0d0',
        textAlign: 'center',
        fontFamily: 'fontawesome',
        fontSize: 24
    },
    detailTitle: {
        height: 48,
        padding: 12,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    detailTitleFont: {
        color: '#109d59',
        textAlign: 'center',
        fontFamily: 'fontawesome',
        fontSize: 24,
        marginRight: 12
    },
    detailTitleText: {
        fontSize: 18,
        color: '#109d59'
    },
    folderWrapper: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff'
    },
    folderContainer: {
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1
    },
    folderIcon: {
        width: 48,
        height: 48,
        marginRight: 14,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    folderIconFont:{
        fontFamily: 'fontawesome',
        fontSize: 24
    },
    folderTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    folderTitleText1: {
        marginTop:2,
        color:'#000',
        fontSize:14
    },
    folderTitleText2: {
        marginTop:5,
        color:'#999',
        fontSize:12
    }
})
