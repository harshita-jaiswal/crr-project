exports.sendEmails = (req, res) => {
  let receipentEmail = req.body.email;
  let emailText = req.body.string;
  let emailSubject = "Your Purchase Today";

  const nodemailer = require("nodemailer");

  function sendEmail(email, subject, htmlContent, callback) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_AUTH,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_SENDER_ADDRESS,
      to: email,
      subject: subject,
      html: htmlContent,
    };
  
    transporter.sendMail(mailOptions, callback);
  }
  
  exports.sendEmails = (req, res) => {
    const email = req.body.email;
    const text = req.body.string;
    const subject = "Your Purchase Today";
  
    const htmlContent = `<h2>${text}</h2>`;
  
    sendEmail(email, subject, htmlContent, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send("Email sending failed");
      } else {
        console.log(info);
        res.status(200).send(info);
      }
    });
  };
}  