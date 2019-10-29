# myproject



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
### 项目描述
- 技术栈：
    - (前端)vuex、vue-cli 、vue-routertoken、axios、elementUI、fullcalendar、番茄计时
    - （后端）eggjs、sequlize、md5、jwt、fs、stream-wormhole
    - （数据库）mysql
- 项目描述：
    - 1、本次项目采用前后端分离，用户登陆服务器校验完成后返回token值，用户携带token进行页面的访问。token限制接口的访问，无登录获取token，不可访问接口。保证了接口和数据的安全性。
    - 2、用户注册、登陆时均对用户进行安全校验，除此之外，密码采用md5加密处理。
        - （1）注册时采用短信发送信息给用户身份进行校验。使用MD5加密（账户Id + 账户授权令牌 + 时间戳），其中账户Id和账户授权令牌根据url的验证级别对应主账户。 时间戳是当前系统时间，限制有效时间。
        - （2）登陆时采用验证码进行校验。随机生成数字，通过时间戳更新验证码。
    - 3、日程页面一个周日历，在日历里会根据用户选择查看‘月、周、日、年列表’可视化视图来查看用户对应的日程，清晰明了。包含日历的增、删、查、改。
    - 4、习惯页面是用于用户创建记时待办的事物，这里采用番茄工作记时法，专心致志工作25分钟，休息5分钟，告别拖延症。用户点击开始时，程序开始倒计时，倒计时结束会给用户提醒。包含习惯的增、删、查、改
    - 5、总结页面，记录用户一天的心得体会。这里采用时实保存，通过监听数据变化进行服务端数据存储。改页面包含增、删、查、改。
    - 6、除此之外，每个输入框会校验用户的输入，不正确的输入形式会有相对应的提示，保证后台接受到符合的数据存进数据
    - 7、清单功能图片的上传与回显。

### 页面演示效果
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/gifhome.gif)
### 图片演示效果
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p1.jpg)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p2.jpg)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p3.jpg)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p4.jpg)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p5.jpg)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p6.png)
![image](https://github.com/QGX1/timeManage/blob/dev/vue/vue_myproject/src/assets/最终效果/p7.jpg)