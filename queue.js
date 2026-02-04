const mysql2 = require("mysql2/promise");
const { Resend } = require("resend");

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

  const [rows] = await connection.query(
    "UPDATE `email_queues` SET `status` = 'processing' WHERE `status` = 'pending'",
  );

  console.log("Success");

  try {
    const resend = new Resend("re_VUJZvXvL_KekbnRVeuBz93Y4zTkqA1n91");

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "dung.vuquoc0102@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
})();
