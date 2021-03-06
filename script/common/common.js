/**
 * @name 测试模式开关
 *
 * @type {boolean}
 */
//正式版为false，测试版为true
// var TESTMODE = false;
var TESTMODE = false;

/**
 * @name 调试模式开关
 *
 * @type {boolean}
 */
var TIP_STR = "信息提示"
var DEBUG = true;
var BASE_QINIU_URL = 'http://art.isart.me/'


// 控制台输出
var consoledebug = (DEBUG) ? console : new nodebug()

// 定义 nodebug 方法
function nodebug() {
}

// 为 nodebug 原型添加 log 方法
nodebug.prototype.log = function (str) {
}
// 为 nodebug 原型添加 log 方法
nodebug.prototype.warn = function (str) {
}

/**
 * @name 定义常量
 *
 */


/**
 * @name 封装 设置 stroage
 *
 * @author leek
 *
 * @param key       string      键
 * @param value     object      值
 */
function setStorage(key, value) {
    $api.setStorage(key, value)
}

/**
 * @name 封装 获取 stroage
 *
 * @author leek
 *
 * @param key   string      键
 */
function getStorage(key) {
    return $api.getStorage(key)
}

/**
 * @name 封装 移除 stroage
 *
 * @author leek
 *
 * @param key   string      键
 */
function removeStorage(key) {
    return $api.rmStorage(key)
}

/**
 * @name 封装 清除 stroage
 *
 * @author leek
 */
function clearStorage() {
    return $api.clearStorage()
}

/**
 * @name 封装 storage是否存在用户信息
 *
 * @author leek
 *
 * @return boolean
 */
function isHasUserInfo() {
    if (isObjectEmpty(getStorageUser())) {
        return false
    }

    return true
}



/**
 * @name 封装 获取用户信息
 *
 * @author leek
 *
 * @return object   用户信息
 */
function getStorageUser() {
    consoledebug.log('getStorageUser ret is : ' + JSON.stringify(getStorage('user_info')))
    return getStorage('user_info')
}
/**
 * @name 封装 对象中是否存在属性
 *
 * @author leek
 *
 * @return boolean
 */
function isObjectOwnProperty(object, property) {
    if (isObjectEmpty) {
        return false
    }

    if (object.hasOwnProperty(property)) {
        return true
    }

    return false
}

/**
 * @name 封装 对象是否为空
 *
 * @author leek
 *
 * @return boolean
 */
function isObjectEmpty(object) {
    if ($.isEmptyObject(object)) {
        return true
    }

    return false
}


/**
 * @name 正则验证
 *
 * @author leek
 *
 * @param type 验证类型
 * @param value 待验证值
 * @returns {boolean}
 */
function regular(type, value) {
    switch (type) {
        // 手机号码
        case 'phone_num':
            var reg = new RegExp("^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$")
            return reg.test(value) ? true : '请填写正确的手机号码格式'
            break
        // 身份证号码
        case 'id_card':
            var reg = new RegExp("^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$")
            return reg.test(value) ? true : '请填写正确的身份证号码格式'
            break
        // 日期
        case 'date':
            var reg = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}$")
            return reg.test(value) ? true : '请填写正确的日期格式'
            break
        // 时间
        case 'time':
            var reg = new RegExp("^(20|21|22|23|[0-1]\\d):[0-5]d:[0-5]\\d$")
            return reg.test(value) ? true : '请填写正确的时间格式'
            break
        // 日期时间
        case 'date_time':
            var reg = new RegExp("^[1-9]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])s+(20|21|22|23|[0-1]\\d):[0-5]d:[0-5]\\d$")
            return reg.test(value) ? true : '请填写正确的日期及时间格式'
            break
        // 验证码
        case 'verify_code':
            var reg = new RegExp("^\\d{4}$")
            return reg.test(value) ? true : '请填写正确的验证码格式'
            break
        // 邮政编码
        case 'post_code':
            var reg = new RegExp("^[1-9][0-9]{5}$")
            return reg.test(value) ? true : '请填写正确的验证码格式'
            break
        // 弱密码
        case 'weak_password':
            var reg = new RegExp("^\\w{6,15}$")
            return reg.test(value) ? true : '密码长度在6~15之间，只能包含字母、数字和下划线'
            break
        // 强密码
        case 'strong_password':
            var reg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$")
            return reg.test(value) ? true : '密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间'
            break
        // 电子邮箱
        case 'e-mail':
            var reg = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
            return reg.test(value) ? true : '请填写正确的Email地址格式'
            break
        // 姓名
        case 'rel_name':
            var reg = new RegExp("^[\u4E00-\u9FA5\\uf900-\\ufa2d·s]{2,20}$")
            return reg.test(value) ? true : '请填写正确的中文姓名格式'
            break
        // 车牌号
        case 'car_num':
            var reg = new RegExp("([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})")
            return reg.test(value) ? true : '请填写正确的车牌号格式'
            break
        default:
            return true
    }
}

// 全局等待验证码时间
var globalTimeForVerify = 60

/**
 * @name 一分钟后获取验证码
 *
 * @author leek
 */
function waitingForVerify() {
    if (globalTimeForVerify === 0) {
        var get_code=language_update($api.getStorage('language'),'get_code')
        $('#verify_btn').text('Get code').removeClass('disable')
        $('#demo').addClass('aui-hide')
        bindClickVerify()
        globalTimeForVerify = 60
    } else {
        $('#verify_btn').text( globalTimeForVerify + ' sec ').addClass('disable')
        $('#demo').removeClass('aui-hide')
        globalTimeForVerify--
        setTimeout(function () {
            waitingForVerify()
        }, 1000)
    }
}

/**
 * @name 未获取验证码按钮进行点击事件绑定及取消点击事件绑定
 *
 * @author leek
 */
function bindClickVerify() {
    $('#verify_btn').on('click', function (event) {
        var _this = $(this)
        var phone_num = $('#phone_num').val().trim()

        if (regular('phone_num', phone_num) !== true) {
            dialog_evaluation(TIP_STR, '请填写正确的手机号码', [{text: '确认'}], function (ret, err) {
                closeDialogBox('evaluation')
            })
            return
        }

        var param = {
            phonenum: phone_num
        }

        sendVertifyCode(param, function (ret, err) {
            consoledebug.log('send vertify code ret is : ' + JSON.stringify(ret))
            if (ret.result) {

                toast(ret.ret)
                openWin('sms_login_win', '../../html/login/', {type:'regis'}, 1, false);                _this.off(event)
                waitingForVerify()
            } else {
                toast(JSON.stringify(err))
            }
        })
    })
}

function randomNum(n) {
    var random = "";
    for (var i = 0; i < n; i++) {
        random += Math.floor(Math.random() * 10);
    }
    return random;
}

//获取文件类型
function getFileType(path) {
    var path_array = path.split('.')
    var type = path_array[path_array.length - 1]

    return type
}

function getFileName(path) {
    var path_array = path.split('/')
    var name = path_array[path_array.length - 1]

    return name
}

function setFileName() {
    var name = '' + moment().year() + (moment().month() + 1) + moment().date() + moment().hour() + moment().minute() + moment().second() + moment().millisecond() + randomNum(6)

    return name
}

function getRealQiniuUrl(key) {
    return BASE_QINIU_URL + key
}

function qiniuUrlTool(img_url, type) {

    if (!img_url) {
        return ''
    }

    //如果不是七牛的头像，则直接返回图片
    //consoledebug.log("img_url:" + img_url + " indexOf('isart.me'):" + img_url.indexOf('isart.me'));
    if (img_url.indexOf('7xku37.com') < 0 && img_url.indexOf('isart.me') < 0) {
        return img_url;
    }
    //七牛链接
    var qn_img_url
    var size_w_500_h_200 = '?imageView2/1/w/500/h/200/interlace/1/q/75'
    var size_w_200_h_200 = '?imageView2/1/w/200/h/200/interlace/1/q/75'
    var size_w_500_h_300 = '?imageView2/1/w/500/h/300/interlace/1/q/75'
    var size_w_300_h_300 = '?imageView2/1/w/300/h/300/interlace/1/q/75'
    var size_w_500_h_250 = '?imageView2/1/w/500/h/250/interlace/1/q/75'
    var size_w_460_h_460 = '?imageView2/1/w/460/h/460/interlace/1/q/75'
    var size_w_600_h_600 = '?imageView2/1/w/600/h/600/interlace/1/q/75'
    var size_w_600_h_300 = '?imageView2/1/w/600/h/300/interlace/1/q/75'
    var size_w_500 = '?imageView1/1/w/500/interlace/1/q/75'
    var size_w_350_h_200 = '?imageView2/1/w/350/h/200/interlace/1/q/100'
    var size_w_75_h_75 = '?imageView2/1/w/75/h/75/interlace/1/q/100'
    var size_w_300_h_500='?imageView2/1/w/300/h/500/interlace/1/q/75'
    if (img_url.indexOf("?") >= 0) {
        img_url = img_url.split('?')[0]
    }

    switch (type) {
        case  'ad':
            qn_img_url = img_url + size_w_600_h_300
            break
        case  'goods':
            qn_img_url = img_url + size_w_500_h_300
            break
        case  'tuijian':
            qn_img_url = img_url + size_w_300_h_500
            break
        case  'rect':
            qn_img_url = img_url + size_w_300_h_300
            break
        case  'avatar':
            qn_img_url = img_url + size_w_200_h_200
            break
        case  'list':      //头像信息
            qn_img_url = img_url + size_w_200_h_200
            break;
        default:
            qn_img_url = img_url
            break
    }
    return qn_img_url
}

function getSum(array) {
    var arr = array
    var sum = arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr
    })
    return sum
}



// 判断参数是否为空
// function judgeIsAnyNullStr() {
//     if (arguments.length > 0) {
//         for (var i = 0; i < arguments.length; i++) {
//             if (!isArray(arguments[i])) {
//                 if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "未设置" || arguments[i] == "undefined") {
//                     return true
//                 }
//             }
//         }
//     }
//     return false
// }
function judgeIsAnyNullStr(argument) {
    consoledebug.log('judgeIsAnyNullStr argument is : '+argument)
    if (argument == null ||argument == 'null' || argument == "" || argument == undefined || argument == "未设置" || argument == "undefined") {
        return true
    }
    return false
}

/*
 * 改进版判断参数为空的方法
 *
 * 提示信息
 *
 */

function judgeIsAnyNullStrImp(obj) {
    if (obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var value = obj[i].value;
            var name = obj[i].name;
            if (!isArray(value)) {
                if (value == null || value == "" || value == undefined || value == "未设置") {
                    showToast(name + language_update($api.getStorage('language'),'can not be empty'));
                    return true;
                }
            }
        }
    }
    return false;
}
//判断值不为空 不提示
function judgeIsAnyNullStrImp1(obj) {
    if (obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var value = obj[i].value;
            var name = obj[i].name;
            if (!isArray(value)) {
                if (value == null || value == "" || value == undefined || value == "未设置") {
                    /*showToast(name + "不能为空");*/
                    return true;
                }
            }
        }
    }
    return false;
}


// 判断数组时候为空, 服务于 judgeIsAnyNullStr 方法
function isArray(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
}

//设置值
function setDefaultValue(val, default_val, more_val) {
    if (judgeIsAnyNullStr(val)) {
        return default_val;
    } else {
        if (judgeIsAnyNullStr(more_val)) {
            return val;
        } else {
            return val + more_val;
        }
    }
}


//获取头像，如果未设置头像则返回
/*
 * hi：为图片的url地址
 * dir：为页面相对于html所在的位置
 */
function getHeadIcon(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/default_headicon.png";
    }
    return qiniuUrlTool(hi, "avatar");
}
//空时图片
function getNullimage(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/mic_head.png";
    }
    return qiniuUrlTool(hi, "avatar");
}

//获取上传图标，如果未设置头像则返回
/*
 * hi：为图片的url地址
 * dir：为页面相对于html所在的位置
 */
function getRectImg(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/add_pic.png";
    }
    return qiniuUrlTool(hi, "avatar");
}

//获取值，如果为空则设置默认值

/*
 * 用于对象克隆
 *
 * obj 对象，返回克隆对象
 *
 */
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}





//获取上传七牛的文件名
function getQiniuKey() {
    var date = new Date();
    var generate_key = "";
    generate_key = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + ""
        + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + "" + date.getMilliseconds() + ""
        + getRandomNum(6);
    return generate_key;
}

//获取mutils位的随机数
function getRandomNum(mutils) {
    var rand = "";
    for (var i = 0; i < mutils; i++) {
        var a = parseInt(10 * Math.random());
        rand += a + "";
    }
    return rand;
}

//获取图片真实地址
function getImgRealUrl(url) {
    return BASE_QINIU_URL + url;
}



//获取未获取到数据的提示
function getNodataTipHtml(dir, tip) {
    var noData_tip_html;
    if (judgeIsAnyNullStr(tip)) {
        tip = "暂无数据";
    }
    if (judgeIsAnyNullStr(dir)) {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center'>" +
            "<img src='../../image/no_data.png' style='width: 240px;height: 160px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    } else {
        noData_tip_html = "<div style='padding-top:85px;padding-bottom: 85px;'>" +
            "<div class='aui-flex-col aui-flex-center  margin-bottom-15'>" +
            "<img src='" + dir + "/image/no_data.png' style='width: 240px;height: 160px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            tip +
            "</div>" +
            "</div>";
    }
    return noData_tip_html;
}


/*
 * 将数据库格式日期转换为显示日期
 *
 * 2017-10-30 09:21:22 转为为 2017年10月30日 09:21
 *
 *
 */
function convertDateToChi(date_str) {
    var ys_arr = date_str.split(" ");
    return convertDateFormate(ys_arr[0], 2) + " " + ys_arr[1].substring(0, 5);
}

/*
 * 获取小时和分钟
 *
 * 2017-10-30 09:21:22 09:21
 *
 *
 */
function convertDateToHourMinute(date_str) {
    var ys_arr = date_str.split(" ");
    return ys_arr[1].substring(0, 5);
}

/*
 * 根据f_table获取相关值
 *
 */
function getStrByFTable(f_table) {
    switch (f_table) {
        case "repair":
            return "维修";
        case "logistics":
            return "物流";
        case "order":
            return "订单";
        default :
            return "未知";
    }
}




//年月日 判断如果时分秒为00:00:00 就显示年月日
function date_update(date) {
   consoledebug.log("date_update date is --->"+JSON.stringify(date))
    var hour =date.substring(11)//获得时分秒
    consoledebug.log("date_update hour is --->"+JSON.stringify(hour))
    if(hour=='00:00:00'){//判断时分秒是否为空
        var Date=/\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
        consoledebug.log("date_update Date is --->"+JSON.stringify(Date))
        return Date;
    }else{
        return date;
    }
}





//数组中去掉空元素
Array.prototype.notempty = function(){
    for(var i=0; i<this.length; i++){
        if(this[i] == "" || typeof(this[i]) == "undefined"||this[i] == null){
            this.splice(i,1);
            i--;
        }
    }
    return this;
};





/**
 * 仿微信时间格式化
 * @param time
 * @returns {string}
 *
 * by Amy
 */
// function setTime(time){
//     if(getStorage('language')=='zh'){
//         var days_ago='天前'
//         var yesterday='昨天'
//         var hours_ago='小时前'
//         var minutes_ago='分钟前'
//         var seconds_ago='秒前'
//         var just_now='刚刚'
//     }
//     else{
//         var days_ago=' days ago'
//         var yesterday=' yesterday'
//         var hours_ago=' hours ago'
//         var minutes_ago=' minutes ago'
//         var seconds_ago=' seconds ago'
//         var just_now='just now'
//     }
//
//
//     consoledebug.log('setTime getFormatDate is : '+getFormatDate())
//     // var currentTime = Date.parse(new Date());
//     var currentTime = timeDateToUnix(getFormatDate());
//     consoledebug.log('setTime currentTime is : '+currentTime)
//     var dateTime = time;//后台传递来的时间
//     consoledebug.log('setTime dateTime is : '+dateTime)
//     // var d_day = Date.parse(new Date(dateTime));
//     var d_day = timeDateToUnix(dateTime);
//     consoledebug.log('setTime d_day is : '+d_day)
//     if(d_day==currentTime){
//         return_time=just_now
//     }
//     else{
//         //获取当前日期的年份和指定日期的年份
//         var currentTime_year=(new Date()).getFullYear();
//         var d_day_year=timeStampString(time,'Y');
//         if(currentTime_year==d_day_year){
//             // var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
//             // var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
//             // var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
//             // var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
//             var day = Math.abs(parseInt((d_day - currentTime)/3600/24));//计算日期
//             var hour = Math.abs(parseInt((d_day - currentTime)/3600));//计算小时
//             var minutes = Math.abs(parseInt((d_day - currentTime)/60));//计算分钟
//             var seconds = Math.abs(parseInt((d_day - currentTime)));//计算秒
//             console.log(day);
//             var return_time='';
//             if(day > 7){
//                 return_time=timeStampString(dateTime,'m-d h:i')
//             }
//             else if(day >= 2&&day <= 7){
//                 return_time=(parseInt(day)+days_ago).toString();
//                 return_time+=' '+timeStampString(dateTime,'h:i')
//             }else if(day > 0 && day < 2){
//                 return_time=(yesterday).toString();
//                 return_time+=' '+timeStampString(dateTime,'h:i')
//             }else if(hour > 0 && hour < 24){
//                 return_time=(parseInt(hour)+hours_ago).toString();
//             }else if(minutes > 0 && minutes < 60){
//                 return_time=(parseInt(minutes)+minutes_ago).toString();
//             }else if(seconds > 0 && seconds < 60){
//                 return_time=(parseInt(seconds)+seconds_ago).toString();
//             }
//         }
//         else{
//             return_time=dateTime
//         }
//     }
//
//     return return_time
// }
function setTime(time){
    if(getStorage('language')=='zh'){
        var days_ago='天前'
        var yesterday='昨天'
        var hours_ago='小时前'
        var minutes_ago='分钟前'
        var just_now='刚刚'
    }
    else{
        var days_ago='d'
        var yesterday=' 1d'
        var hours_ago=' h'
        var minutes_ago=' m'
        var just_now='just now'
    }


    consoledebug.log('setTime getFormatDate is : '+getFormatDate())
    // var currentTime = Date.parse(new Date());
    var currentTime = timeDateToUnix(getFormatDate());
    consoledebug.log('setTime currentTime is : '+currentTime)
    var dateTime = time;//后台传递来的时间
    consoledebug.log('setTime dateTime is : '+dateTime)
    // var d_day = Date.parse(new Date(dateTime));
    var d_day = timeDateToUnix(dateTime);
    consoledebug.log('setTime d_day is : '+d_day)
    //获取当前日期的年份和指定日期的年份
    var currentTime_year=(new Date()).getFullYear();
    var d_day_year=timeStampString(time,'Y');
    if(currentTime_year==d_day_year){
        // var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
        // var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
        // var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
        // var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
        var day = Math.abs(parseInt((d_day - currentTime)/3600/24));//计算日期
        var hour = Math.abs(parseInt((d_day - currentTime)/3600));//计算小时
        var minutes = Math.abs(parseInt((d_day - currentTime)/60));//计算分钟
        var seconds = Math.abs(parseInt((d_day - currentTime)));//计算秒
        console.log(day);
        var return_time='';
        if(day > 7){
            return_time=yearAndmonthUpdateCon(dateTime,false)
            return_time=return_time
        }
        else if(day >= 2&&day <= 7){
            return_time=(parseInt(day)+days_ago).toString();
            return_time=return_time
        }else if(day > 0 && day < 2){
            return_time=(yesterday).toString();
            return_time=return_time
        }else if(hour > 0 && hour < 24){
            return_time=(parseInt(hour)+hours_ago).toString();
        }else if(minutes > 0 && minutes < 60){
            return_time=(parseInt(minutes)+minutes_ago).toString();
        }else if(seconds > 0 && seconds < 60){
            return_time=just_now;
        }
    }
    else{
        return_time=yearAndmonthUpdateCon(dateTime,true)
        return_time=return_time
    }

    return return_time
}

function setTime1(time){
    if(getStorage('language')=='zh'){
        var days_ago='天前'
        var yesterday='昨天'
        var hours_ago='小时前'
        var minutes_ago='分钟前'
        var just_now='刚刚'
    }
    else{
        var days_ago='d'
        var yesterday=' 1d'
        var hours_ago=' h'
        var minutes_ago=' m'
        var just_now='just now'
    }


    consoledebug.log('setTime getFormatDate is : '+getFormatDate())
    // var currentTime = Date.parse(new Date());
    var currentTime = timeDateToUnix(getFormatDate());
    consoledebug.log('setTime currentTime is : '+currentTime)
    var dateTime = time;//后台传递来的时间
    consoledebug.log('setTime dateTime is : '+dateTime)
    // var d_day = Date.parse(new Date(dateTime));
    var d_day = timeDateToUnix(dateTime);
    consoledebug.log('setTime d_day is : '+d_day)
    //获取当前日期的年份和指定日期的年份
    var currentTime_year=(new Date()).getFullYear();
    var d_day_year=timeStampString(time,'Y');
    if(currentTime_year==d_day_year){
        // var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
        // var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
        // var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
        // var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
        var day = Math.abs(parseInt((d_day - currentTime)/3600/24));//计算日期
        var hour = Math.abs(parseInt((d_day - currentTime)/3600));//计算小时
        var minutes = Math.abs(parseInt((d_day - currentTime)/60));//计算分钟
        var seconds = Math.abs(parseInt((d_day - currentTime)));//计算秒
        console.log(day);
        var return_time='';
        if(day > 7){
            return_time=yearAndmonthUpdateCon(dateTime,false)
            return_time=return_time+" "+timeStampString(dateTime,'h:i')
        }
        else if(day >= 2&&day <= 7){
            return_time=(parseInt(day)+days_ago).toString();
            return_time=return_time+" "+timeStampString(dateTime,'h:i')
        }else if(day > 0 && day < 2){
            return_time=(yesterday).toString();
            return_time=return_time+' '+timeStampString(dateTime,'h:i')
        }else if(hour > 0 && hour < 24){
            return_time=(parseInt(hour)+hours_ago).toString();
        }else if(minutes > 0 && minutes < 60){
            return_time=(parseInt(minutes)+minutes_ago).toString();
        }else if(seconds > 0 && seconds < 60){
            return_time=just_now;
        }
    }
    else{
        return_time=yearAndmonthUpdateCon(dateTime,true)
        return_time=return_time+" "+timeStampString(dateTime,'h:i')
    }
    consoledebug.log('return time is :'+return_time)
    return return_time
}

function setTimeVip(time){
    if(getStorage('language')=='zh'){
        var days_ago='天前'
        var yesterday='昨天'
        var hours_ago='小时前'
        var minutes_ago='分钟前'
        var just_now='刚刚'
    }
    else{
        var days_ago='d'
        var yesterday=' 1d'
        var hours_ago=' h'
        var minutes_ago=' m'
        var just_now='just now'
    }


    consoledebug.log('setTime getFormatDate is : '+getFormatDate())
    // var currentTime = Date.parse(new Date());
    var currentTime = timeDateToUnix(getFormatDate());
    consoledebug.log('setTime currentTime is : '+currentTime)
    var dateTime = time;//后台传递来的时间
    consoledebug.log('setTime dateTime is : '+dateTime)
    // var d_day = Date.parse(new Date(dateTime));
    var d_day = timeDateToUnix(dateTime);
    consoledebug.log('setTime d_day is : '+d_day)
    //获取当前日期的年份和指定日期的年份
    var currentTime_year=(new Date()).getFullYear();
    var d_day_year=timeStampString(time,'Y');
    // if(currentTime_year==d_day_year){
        // var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
        // var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
        // var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
        // var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
        // var day = Math.abs(parseInt((d_day - currentTime)/3600/24));//计算日期
        // var hour = Math.abs(parseInt((d_day - currentTime)/3600));//计算小时
        // var minutes = Math.abs(parseInt((d_day - currentTime)/60));//计算分钟
        // var seconds = Math.abs(parseInt((d_day - currentTime)));//计算秒
        // console.log(day);
        // var return_time='';
        // if(day > 7){
        //     return_time=yearAndmonthUpdateCon(dateTime,false)
        //     // return_time=return_time+" "+timeStampString(dateTime,'h:i')
        // }
        // else if(day >= 2&&day <= 7){
        //     return_time=(parseInt(day)+days_ago).toString();
        //     return_time=return_time+" "+timeStampString(dateTime,'h:i')
        // }else if(day > 0 && day < 2){
        //     return_time=(yesterday).toString();
        //     return_time=return_time+' '+timeStampString(dateTime,'h:i')
        // }else if(hour > 0 && hour < 24){
        //     return_time=(parseInt(hour)+hours_ago).toString();
        // }else if(minutes > 0 && minutes < 60){
        //     return_time=(parseInt(minutes)+minutes_ago).toString();
        // }else if(seconds > 0 && seconds < 60){
        //     return_time=just_now;
        // }
    //     return_time=yearAndmonthUpdateCon(dateTime,false)
    // }
    // else{
    //     return_time=yearAndmonthUpdateCon(dateTime,true)
    //     // return_time=return_time+" "+timeStampString(dateTime,'h:i')
    // }

    return yearAndmonthUpdateCon(dateTime,true)
}
/**
 * 当前日期格式化
 *
 * by Amy
 *
 */
function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}



/**
 * 普通时间格式化
 *
 * @param time
 * @param typ
 * @returns {string}
 *
 * by Amy
 */
function timeStampString(time,type){
    time=$.myTime.DateToUnix(time)
    time=$.myTime.UnixToDate(time,type,8)
    return time
}

/**
 * 时间戳封装成方法
 *
 * @param time
 * @param typ
 * @returns {string}
 *
 * by Amy
 */
function timeDateToUnix(time){
    time=$.myTime.DateToUnix(time)
    return time
}

/**
 * 获取时间戳、格式化时间相互转化
 *
 * by Amy
 */
$.extend({
    myTime: {
        /**
         * 当前时间戳
         * @return <int>    unix时间戳(秒)
         */
        CurTime: function(){
            return Date.parse(new Date())/1000;
        },
        /**
         * 日期 转换为 Unix时间戳
         * @param <string> 2014-01-01 20:20:20 日期格式
         * @return <int>    unix时间戳(秒)
         */
        DateToUnix: function(string) {
            var f = string.split(' ', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
            )).getTime() / 1000;
        },
        UnixToDate: function(unixTime, type, timeZone) {
            if (typeof (timeZone) == 'number')
            {
                unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
            }
            var time = new Date(unixTime * 1000);
            var ymdhis = "";
            var year= time.getUTCFullYear();
            var month= (time.getUTCMonth()+1);
            var date= time.getUTCDate();
            var hours= time.getUTCHours();
            var minutes= time.getUTCMinutes();
            var seconds= time.getUTCSeconds();
            if(month<10){
                month='0'+month;
            }
            if(date<10){
                date='0'+date;
            }
            if(hours<10){
                hours='0'+hours;
            }
            if(minutes<10){
                minutes='0'+minutes;
            }
            if(seconds<10){
                seconds='0'+seconds;
            }

            if(type == 'Y-m-d h:i:s'){
                ymdhis=year+ "-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds
            }
            else if(type == 'Y-m-d'){
                ymdhis=year+ "-"+month+"-"+date
            }
            else if(type == 'm-d h:i'){
                ymdhis=month+"-"+date+" "+hours+":"+minutes
            }
            else if(type == 'h:i'){
                ymdhis=hours+":"+minutes
            }
            else if(type == 'Y'){
                ymdhis=year
            }
            else if(type == 'm'){
                ymdhis=month
            }
            else if(type == 'd'){
                ymdhis=date
            }
            return ymdhis;
        }
    }
});

/**
 * 对点赞等会产生大数据统计的显示处理
 * @param data
 * @returns {*}
 */
function handleData(data){
    if(getStorage('language')=='zh'){
        if(data<10000){
            return data;
        }
        else if(data>=10000&&data<100000000){
            if(data%10000==0){
                data=data/10000
                return data+"万";
            }
            else{
                var data_m=parseInt(data / 10000);
                var data_t=parseInt((data-data_m*10000) / 1000);
                data=data_m+"."+data_t;
                return data+"万";
            }
        }
        else if(data>=100000000){
            if(data%100000000==0){
                data=data/100000000
                return data+"亿";
            }
            else{
                var data_m=parseInt(data / 100000000);
                var data_t=parseInt((data-data_m*100000000) / 10000000);
                data=data_m+"."+data_t;
                return data+"亿";
            }
        }
    }
    else{
        if(data<1000){
            return data;
        }
        else if(data>=1000&&data<10000000){
            data=parseInt(data/1000)
            return data+" thousand";
        }
        else if(data>=1000000&&data<100000000){
            data=parseInt(data/1000000)
            return data+" million";
        }
        else if(data>=100000000){
            if(data%100000000==0){
                data=data/100000000
                return data+" billion";
            }
            else{
                var data_m=parseInt(data / 100000000);
                var data_t=parseInt((data-data_m*100000000) / 10000000);
                data=data_m+"."+data_t;
                return data+" billion";
            }
        }
    }
}

//计算两个日期天数差的函数，通用
function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式

    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    return iDays;  //返回相差天数
}


//补0
function paddedZero(str,length){
    var zero=''
    for(var i=0;i<length;i++){
        zero+='0'
    }
    str=zero+str
    return str;
}







//年月日的修改
function yearAndmonthUpdateCon(date,is_year) {
    var month_en;
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    if(month=="01"){
        month_en ="Jan"
    }else if(month=="02"){
        month_en ="Feb"
    }else if(month=="03"){
        month_en ="Mar"
    }else if(month=="04"){
        month_en ="Apr"
    }else if(month=="05"){
        month_en ="May"
    }else if(month=="06"){
        month_en ="Jun"
    }else if(month=="07"){
        month_en ="Jul"
    }else if(month=="08"){
        month_en ="Aug"
    }else if(month=="09"){
        month_en ="Sep"
    }else if(month=="10"){
        month_en ="Oct"
    }else if(month=="11"){
        month_en ="Nov"
    }else if(month=="12"){
        month_en ="Dec"
    }
    var day = date.substring(8, 10);
    if(is_year){
        var all =day+" "+month_en+", "+year
    }
    else{
        var all =day+" "+month_en
    }
    return all;
}

/**
 * 获取当前时间
 * @param format  时间格式  目前根据项目只做了两种：年月日（yyyy-mm-dd）/年月日时分秒
 * @returns {string}
 */
function getTheCurrentTime(format) {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    if (format == 'yyyy-mm-dd') {
        var now = year + '-' + getNow(month) + "-" + getNow(date);
    }
    else {
        var now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
    }
    return now;
}

// 时间补0
function getNow(s) {
    return s < 10 ? '0' + s : s;
}

/**
 * 根据后缀识别文件类型
 * @param url
 * @returns {string}
 *
 * by Amy
 */
function determineTheFileTypeBySuffix(url) {
    var point = url.lastIndexOf(".");
    var suffix = url.substr(point);
    suffix = suffix.toUpperCase()
    consoledebug.log('determineTheFileTypeBySuffix suffix is : ' + suffix)
    if (suffix == ".BMP" || suffix == ".PNG" || suffix == ".GIF" || suffix == ".JPG" || suffix == ".JPEG" || suffix == ".TIF") {  //根据后缀，判断是否符合图片格式
        return 'pic';
    }
    else if (suffix == '.MP4' || suffix == '.MPEG' || suffix == '.MPG' || suffix == '.DAT' || suffix == '.AVI' || suffix == '.MOV' || suffix == '.ASF' || suffix == '.FLV' || suffix == '.WMV' || suffix == '.3GP' || suffix == '.F4V' || suffix == '.RMVB' || suffix == '.RM' || suffix == '.MKV' || suffix == '.MPG' || suffix == '.VOB' || suffix == '.SWF') {
        return 'video';
    }
    else if (suffix == '.MP3' || suffix == '.AMR' || suffix == '.WMA' || suffix == '.APE' || suffix == '.FLAC' || suffix == '.AAC' || suffix == '.MIDI') {
        return 'audio';
    }
    else {
        return '';
    }
}
// 判断手机系统
function judgingMobilePhoneSystem() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //安卓手机
        return 'android'
    } else if (u.indexOf('iPhone') > -1) {
        //苹果手机
        return 'ios'
    } else if (u.indexOf('Windows Phone') > -1) {
        //winphone手机
        return "winphone"
    }
}