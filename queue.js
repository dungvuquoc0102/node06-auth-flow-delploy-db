const mysql2 = require("mysql2/promise");

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

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
})();
