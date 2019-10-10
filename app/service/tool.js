// app/service/tool.js
// 发送邮箱配置（丘桂娴）
"use strict";

const Service = require("egg").Service;
const nodemailer = require("nodemailer");
const user_email = "793035324@qq.com";
const auth_code = "jxcptqqnluywbbhh";

const transporter = nodemailer.createTransport({
  service: "qq",
  secureConnection: true,
  port: 465,
  auth: {
    user: user_email, // 用户邮箱
    pass: auth_code // 授权码
  }
});

class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: user_email, // 发送者,与上面的user一致
      to: email, // 接收者,可以同时发送多个,以逗号隔开
      subject, // 标题
      text, // 文本
      html
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ToolService;
