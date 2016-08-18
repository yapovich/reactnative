/**
 * Created by yebo on 2016/8/9.
 */
import {default as BaseDao} from './BaseDao'
const allfields=[
    "id",
    "name",
    "yph"
]
export default class InfoDao extends BaseDao {
    constructor(){
        super();
    }
    getCount(success) {
        this.execute('select count(*) count from info',[],(result)=>{
            if(success)success(result.rows.item(0)["count"])
        })
    }
    getAllInfos(success) {
        this.execute('select * from info order by id desc',[],(result)=>{
            if(success)success(result.rows.raw())
        })
    }
    createInfo(info,success){
        var fields="",params="",values=[];
        for(var i=0;i<allfields.length;i++){
            var value=info[allfields[i]];
            if(value==""||value==0||value) {
                fields += ',' + allfields[i];
                params += ',?';
                values.push(value);
            }
        }
        if(values.length>0){
            fields=fields.substr(1);
            params=params.substr(1);
            var sql="insert into info ("+fields+") values ("+params+")";
            this.execute(sql,values,(result)=>{
                if(success)success(true);
            },()=>{
                if(success)success(false);
            })
        }else{
            if(success)success(false);
        }
    }
    exportToExcel(success,error) {
        this.doExportToExcel("info", success, error);
    }
}