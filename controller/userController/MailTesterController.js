const mailUtils = require('../../utils/mail')

exports.sendEmailByController = async (req, resp) => {
    
    const password = Math.floor((Math.random()*1000000)+1);


    const mailData = {
        to: 'shiva2611guptanath@gmail.com',
        subject: 'One time password',
        template: 'one-time-password',
        data: {
          name: "Shiva Gupta",
          password: password ,
          url: `https://nodemailer.com/about/`
        }
      }
      const emailResult = await mailUtils.sendMail(mailData);
      resp.json({status: true, result: emailResult})
}