'use strict';

const Service = require('egg').Service;
const svgCaptcha=require('svg-captcha');
const moment=require('moment');
const Base64=require('js-base64').Base64;
const request=require('request');
const md5 = require('blueimp-md5')
class ToolsService extends Service {
//   产生一次性图形验证码
    async captcha() {
      const captcha=svgCaptcha.create({
          size:4,
          fontSize:50,
          width:100,
          height:40,
          ignoreChars: '0o1l',
          noise: 2,
          color: true,
          background:'#eee'
      });
      this.ctx.session.code=captcha.text.toLowerCase()
      //将验证码写入服务端缓存
      // this.ctx.session.maxAge = 1000 * 60 * 10;//设置过期时间
    return captcha;
  }

  /* 
    随机生成指定长度的数字
  */

  async randomCode(length){
    const chars=['0','1','2','3','4','5','6','7','8','9']
    let result="";//统一改名
    for(var i=0;i<length;i++){
      let index=Math.ceil(Math.random()*9);
      result +=chars[index]
    }
    // console.log(result)
     return result
  }

  /* 
  向指定号码发送验证码
   */
  async sendCode(phone,code,callback){
    var ACCOUNT_SID = '8a216da86d05dc0b016d58ce918036b5';
    var AUTH_TOKEN = '94566e6c0900417cb45825239e40abad';
    var Rest_URL = 'https://app.cloopen.com:8883';
    var AppID = '8a216da86d05dc0b016d58ce91dd36bb';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    var sigParameter = '';
    var time = moment().format('YYYYMMDDHHmmss');
    sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    var url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;//统一请求包头
    
    //2. 准备请求体
    var body = {
      to : phone,
      appId : AppID,
      templateId : '1',
      "datas":[code,"1"]
    }
  //body = JSON.stringify(body);

  //3. 准备请求头
  /*
   1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
   2.冒号为英文冒号
   3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
   */
    var authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    // HTTP标准包头字段
    var headers = {
        'Accept' :'application/json',
        'Content-Type' :'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length+'',
        'Authorization' : authorization
    }

  //4. 发送请求, 并得到返回的结果, 调用callback
    // callback(true);
    request({
        method : 'POST',
        url : url,
        headers : headers,
        body : body,
        json : true
    }, function (error, response, body) {
        console.log(error, response, body);
        callback(body.statusCode==='000000');
        // callback(true);
    });
  }
}



module.exports = ToolsService;
