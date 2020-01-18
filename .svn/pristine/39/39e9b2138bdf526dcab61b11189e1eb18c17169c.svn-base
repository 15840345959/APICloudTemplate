
//跳转外部浏览器
function explorer(href) {
        api.openApp({
            androidPkg: 'android.intent.action.VIEW',
            iosUrl: href,
            mimeType: 'text/html',
            uri: href
        }, function (ret, err) {
            consoledebug.log(' href ret is :' + JSON.stringify(ret))
            if (ret==""){
                toast('请更换浏览器')
            }
            var msg = JSON.stringify(ret);

            // api.alert({
            //     title : 'openApp',
            //     msg : msg,
            //     buttons : ['确定']
            // });
        });

}
//获取经纬度
function getLocation(autoStop, callback) {
    var aMap = api.require('aMap');
    consoledebug.log('get location')
    aMap.getLocation({
        autoStop: autoStop
    }, function (ret, err) {
        callback(ret, err)
    });
}
//计算两点之间的距离
function getDistance(lon,lat,lon1,lat1,callback) {
    var aMap = api.require('aMap');
    aMap.getDistance({
        start: {
            lon: lon,
            lat: lat
        },
        end: {
            lon: lon1,
            lat: lat1
        }
    }, function(ret, err) {
        if (ret.status) {
            callback(ret,err)
        } else {
            // alert(JSON.stringify(err));
        }
    });
}
//拨打电话
function callTo(phonenum) {
    api.call({
        type: 'tel_prompt',
        number: phonenum
    });
}
//获得年月日      得到日期oTime
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        // oHour = oDate.getHours(),
        // oMin = oDate.getMinutes(),
        // oSen = oDate.getSeconds(),
        oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日';//最后拼接时间
    return oTime;
}
//获得年月日      得到日期oTime
function getCommentDate(str){
    var oDate = new Date(str);
    var oYear = oDate.getFullYear()
    var oMonth = oDate.getMonth()+1
    var oDay = oDate.getDate()
        consoledebug.log('oYear------->'+JSON.stringify(oYear)+'oMonth------->'+JSON.stringify(oMonth)+'oDay------->'+JSON.stringify(oDay))
        // oHour = oDate.getHours(),
        // oMin = oDate.getMinutes(),
        // oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) ;//最后拼接时间
    return oTime;
}
//补0操作
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}