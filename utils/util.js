
// 加载配置文件
const config = require( '../config.js' );

function formatTime( date ) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

// 格式化时间戳
function getTime( timestamp ) {
    var time = arguments[ 0 ] || 0;
    var t, y, m, d, h, i, s;
    t = time ? new Date( time * 1000 ) : new Date();
    y = t.getFullYear();    // 年
    m = t.getMonth() + 1;   // 月
    d = t.getDate();        // 日

    h = t.getHours();       // 时
    i = t.getMinutes();     // 分
    s = t.getSeconds();     // 秒

    return [ y, m, d ].map( formatNumber ).join('-') + ' ' + [ h, i, s ].map( formatNumber ).join(':');
    
}

module.exports = {

    formatTime: formatTime,
    getTime : getTime,

    AJAX : function( data = '', fn, method = "GET", header = {}){
        wx.request({
            url: config.API_HOST + data,
            method : method ? method : 'GET',
            data: {},
            header: header ? header : {"Content-Type":"application/json"},
            success: function( res ) {
                fn( res ),
                 console.log(res.data);
            }
        });
    },

 
}
