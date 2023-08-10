exports.sendEmails = (req, res) => {
  let email = req.body.email;
  let text = req.body.string;
  let subject = "Your Purchase Today";

  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_AUTH,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_SENDER_ADDRESS, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: "<h2>" + text + "</h2>", // plain text body
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
