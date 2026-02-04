const mysql2 = require("mysql2/promise");
const nodemailer = require("nodemailer");

(async () => {
  const connection = await mysql2.createConnection({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port: "4000",
    user: "3bDShXot2FVxLsD.root",
    password: "PRuR9DXN8PB4wfIx",
    database: "ecommerce_practice",
    ssl: {
      ca: require("fs").readFileSync(__dirname + "/isrgrootx1.pem"),
      rejectUnauthorized: true,
    },
  });

  while (true) {
    const [rows] = await connection.query(
      "UPDATE `email_queues` SET `status` = 'processing' WHERE `status` = 'pending'",
    );

    console.log("Success");

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Sử dụng TLS
        auth: {
          user: "dung.vuquoc0102@gmail.com",
          pass: "zeoa tfra rfie jgfr", // The 16-character App Password
        },
        tls: {
          // Cái này giúp tránh lỗi chứng chỉ không hợp lệ trên một số server hosting
          rejectUnauthorized: false,
        },
      });

      const info = await transporter.sendMail({
        from: '"Dung Vu Quoc" <dung.vuquoc0102@gmail.com>', // sender address
        to: "dungvqf8185@fullstack.edu.vn",
        subject: "Hello ✔",
        text: "Hello world?", // Plain-text version of the message
        html: "<b>Hello world?</b>", // HTML version of the message
      });

      console.log("Message sent:", info.messageId);
    } catch (error) {
      console.log(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
})();
