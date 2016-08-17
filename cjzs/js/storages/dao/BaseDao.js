/**
 * Created by yebo on 2016/8/9.
 */
import SQLite from '../../libs/sqlite';
export default class BaseDao{
    constructor(){
        this.db=null;
    }
    opendb(success,error){
        this.db = SQLite.openDatabase({
            name : "mytest",
            createFromLocation:"~/database/mytest.db"
        },()=>{
            if(success)success()
        },()=>{
            if(error)error()
        });
    }
    closedb(){
         if(this.db&&this.db.close)
             this.db.close();
    }
    execute(sql,params,success,error){
        this.opendb(
            ()=>{
                this.db.transaction((tx) => {
                    tx.executeSql(sql,params,(tx,result)=>{
                        if(success)success(result)
                    },()=>{
                        if(error)error()
                    });
                },()=>{
                    if(error)error()
                });
            });
    }

}