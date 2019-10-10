// 实现请求拦截认证
module.exports = () => {
    const jwt = require('jsonwebtoken');
    return async function (ctx, next) {
        // 获取token中的信息
        const authorization = ctx.get('Authorization');
        if (authorization === '') { // 判断请求头有没有携带 token ,没有直接返回 401
            ctx.throw(401, 'no token detected in http header "Authorization"');
        }
        
        // 含有token时
        const token = authorization.split(' ')[1];//去除数组中第二位数
        console.log("检查的token："+token)
        let tokenContent;
        try {
            // 验证token的合法性
            tokenContent = await jwt.verify(token, 'hrmyproject2019');     //如果 token 过期或验证失败，将返回401
            console.log("验证token:" + tokenContent)
            await next();     // token有效，返回 userInfo ;同理，其它接口在这里处理对应逻辑并返回
        } catch (err) {
            ctx.throw(401, 'invalid token');
        }
    }
  };