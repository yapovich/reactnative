/**
 * Created by yebo on 2016/7/25.
 */
var HashMap=require('./entries/HashMap');
var table=new HashMap();
module.exports={
    handleMessage(key,handler){
        table.put(key,handler);
    },
    sendMessage(msg){
        var handlers=table.values();
        for(var i=0;i<handlers.length;i++){
                handlers[i](msg);
        }
    }
}