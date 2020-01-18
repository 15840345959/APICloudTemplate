/*
*
* 配置路由
* 调用接口
*
* */

//用户注册
function user_register(param, callBack) {
    ajax(param, SERVER_URL + '/user/register', 'POST', callBack, true,'注册中...')
}
//获取验证码
function sendVertifyCode(param, callBack) {
    ajax(param, SERVER_URL + '/sendVertifyCode', 'POST', callBack, true,'获取中...')
}
//根据条件判断用户信息
function user_judgeUserByCon(param, callBack) {
    ajax(param, SERVER_URL + '/user/judgeUserByCon', 'GET', callBack, true)
}
//登录
function user_login(param, callBack) {
    ajax(param, SERVER_URL + '/user/login', 'POST', callBack, true,'登陆中')
}
//重置密码
function userResetPassword(param, callBack) {
    ajax(param, SERVER_URL + '/user/resetPassword', 'POST', callBack, true)
}
