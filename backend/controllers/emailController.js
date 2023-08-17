exports.sendEmails = (req, res) => {
  let recipientEmail = req.body.email;
  let emailText = req.body.string;
  let emailSubject = "Your Purchase Today";

  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_AUTH,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_SENDER_ADDRESS, 
    to: recipientEmail, 
    subject: emailSubject,
    html: "<h2>" + emailText + "</h2>", 
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.status(200).send(info);
    }
  });
};
