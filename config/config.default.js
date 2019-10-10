/* eslint valid-jsdoc: "off" */

'use strict';
module.exports={ assetsSubDirectory: 'static',
assetsPublicPath: '/',
proxyTable: {
  "/api/": {   //以/proxy/为开头的适合这个规则（代理器）   
    target: "http://apis.juhe.cn/goodbook",//目标地址
    "secure": false,//false为http访问，true为https访问
    "changeOrigin": true,//跨域访问设置，true代表跨域
    "pathRewrite": {//路径改写规则
      "^/api": ""//以/proxy/为开头的改写为''
       //下面这种也行
      //  "^/api":"/list"//以/api/为开头的改写为'/list'
    },
    "headers": {//设置请求头伪装成手机端的访问
      "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"
    }
  }
},
}
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556956078246_9469';

  // add your middleware config here
  config.middleware = [];

  //跨域设置
  config.security = {
    csrf: {
      enable: false, //开关功能配置
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    //白名单，指定前端地址
    // domainWhiteList: ["http://localhost:8080"],
    // domainWhiteList: '*',
  };

  // reseful标准
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
 // 数据库配置
 config.sequelize ={
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'need',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'qgx123456789',
  timezone:'+08:00',
  define:{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,//去掉默认的添加时间和更新时间
    createdAt:'created_at',
    updatedAt:'updated_at',
  },
  
}
//  配置公共接口api
  config.api='http://apis.juhe.cn/goodbook/query?key=52794da25b42b9d613582ab0768296b8&catalog_id=246&rn=10&rn=10%27';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.session = {
    key: 'EGG_SESS',  //eggjs默认session的key
    maxAge: 24 * 3600 * 1000,  // 1 day
    httpOnly: true,
    encrypt: true,
    renew: true  //每次访问页面都会给session会话延长时间
  }
  return {
    ...config,
    ...userConfig,
  };
};

