/**
 * Created by yebo on 2016/8/9.
 */
import {default as BaseDao} from './BaseDao'
export default class InfoDao extends BaseDao {
    constructor(){
        super();
    }
    getCount(success) {
        this.query('select count(*) count from INFO',[],(result)=>{
            if(success)success(result.rows.item(0)["count"])
        })
    }
    getAllInfos(success) {
        this.query('select * from INFO',[],(result)=>{
            if(success)success(result.rows.raw())
        })
    }
}