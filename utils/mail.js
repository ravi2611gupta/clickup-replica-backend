require('dotenv').config();
const nodemailer = require("nodemailer");
let ejs = require('ejs');

exports.sendMail = async (mailData) => {
  // MAILTRAP
  var transport = nodemailer.createTransport({
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
  });
  const html = await ejs.renderFile(`./emails/${mailData.template}.ejs`, mailData.data)
  let mailDetail = {
    from: process.env.ETHEREAL_FROM,
    to: mailData.to,
    subject: mailData.subject,
    html: html,
  }
  await transport.sendMail(mailDetail)
  return;
}