/**
 * Created by yebo on 2016/4/8.
 */
var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate()+1; // 当前日
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); // 上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
var DateUtil= {
    //字符串转日期
    str2Date: function (dateStr) {
        return new Date(Date.parse(dateStr.replace(/-/g, "/")));
    },
// 格局化日期：yyyy-MM-dd
    formatDate: function (date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    },
    formatTime: function (date, type) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        var myhour = date.getHours();
        var mymin = date.getMinutes();
        var mysec = date.getSeconds();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        if (myhour < 10) {
            myhour = "0" + myhour;
        }
        if (mymin < 10) {
            mymin = "0" + mymin;
        }
        if (mysec < 10) {
            mysec = "0" + mysec;
        }
        if (type == "hour")
            return myhour + ":" + mymin;
        return (myyear + "-" + mymonth + "-" + myweekday + " " + myhour + ":" + mymin + ":" + mysec);
    },
    getCurrentTimeStr: function () {
        var date=new Date();
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        var myhour = date.getHours();
        var mymin = date.getMinutes();
        var mysec = date.getSeconds();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        if (myhour < 10) {
            myhour = "0" + myhour;
        }
        if (mymin < 10) {
            mymin = "0" + mymin;
        }
        if (mysec < 10) {
            mysec = "0" + mysec;
        }
        return (myyear  + mymonth + myweekday + myhour + mymin + mysec);
    },
//获取实际
    getTime: function (timeStr, type) {
        var date = this.str2Date(timeStr);//new Date(timeStr);
        return this.formatTime(date, type);
    },
//获取当前天
    getDay: function (dateStr) {
        var date = dateStr ? this.str2Date(dateStr) : new Date();
        return this.formatDate(date);
    },
//获取当前天（可按天偏移）
    getToday: function (offset) {
        var date = new Date();
        if (offset != undefined)
            date = new Date(date.getTime() + (offset * 24 * 60 * 60 * 1000));
        return this.formatDate(date);
    },
//获取当前时刻（可按小时偏移）
    getTodayTime: function (offset) {
        var date = new Date();
        if (offset != undefined)
            date = new Date(date.getTime() + (offset * 60 * 60 * 1000));
        return this.formatTime(date);
    },
//获取当前月份
    getMonth: function (dateStr) {
        var now = new Date(); // 当前日期
        var myyear = now.getFullYear();
        var mymonth = now.getMonth() + 1;
        var myweekday = now.getDate();
        if (dateStr) {
            var date = this.str2Date(dateStr);
            myyear = date.getFullYear();
            mymonth = date.getMonth() + 1;
            myweekday = date.getDate();
        }

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth);
    },
// 获得某月的天数
    getMonthDays: function (myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    },
// 获得本季度的开端月份
    getQuarterStartMonth: function () {
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    },
// 获得本周的开端日期
    getWeekStartDate: function (dateStr) {
        var weekStartDate;
        if (!dateStr)
            weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        else {
            var defDate = this.str2Date(dateStr);
            var defYear = defDate.getYear()
            var defMonth = defDate.getMonth()
            var defDay = defDate.getDate() + 1;
            var defDayOfWeek = defDate.getDay();
            defYear += (defYear < 2000) ? 1900 : 0;
            weekStartDate = new Date(defYear, defMonth, defDay - defDayOfWeek);
        }
        return this.formatDate(weekStartDate);
    },
// 获得本周的停止日期
    getWeekEndDate: function (dateStr) {
        var weekEndDate;
        if (!dateStr)
            weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
        else {
            var defDate = this.str2Date(dateStr);
            var defYear = defDate.getYear()
            var defMonth = defDate.getMonth()
            var defDay = defDate.getDate() + 1;
            var defDayOfWeek = defDate.getDay()
            defYear += (defYear < 2000) ? 1900 : 0;
            weekEndDate = new Date(defYear, defMonth, defDay + (6 - defDayOfWeek));
        }
        return this.formatDate(weekEndDate);
    },
// 获得本月的开端日期
    getMonthStartDate: function () {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return this.formatDate(monthStartDate);
    },
// 获得本月的停止日期
    getMonthEndDate: function () {
        var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
        return this.formatDate(monthEndDate);
    },
// 获得上月开端时候
    getLastMonthStartDate: function () {
        var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
        return this.formatDate(lastMonthStartDate);
    },
// 获得上月停止时候
    getLastMonthEndDate: function () {
        var lastMonthEndDate = new Date(nowYear, lastMonth,
            this.getMonthDays(lastMonth));
        return this.formatDate(lastMonthEndDate);
    },
// 获得本季度的开端日期
    getQuarterStartDate: function () {

        var quarterStartDate = new Date(nowYear, this.getQuarterStartMonth(), 1);
        return this.formatDate(quarterStartDate);
    },
// 或的本季度的停止日期
    getQuarterEndDate: function () {
        var quarterEndMonth = this.getQuarterStartMonth() + 2;
        var quarterStartDate = new Date(nowYear, quarterEndMonth,
            this.getMonthDays(quarterEndMonth));
        return this.formatDate(quarterStartDate);
    }
}
//-----------------------------------------end
module.exports = DateUtil;