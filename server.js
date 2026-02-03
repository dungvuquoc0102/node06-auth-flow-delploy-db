const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "2dXTHNbpdHVjaYX.root",
    password: "l1g1JnYXysDpXjqI",
    database: "ecommerce_practice",
    ssl: {
      // Đọc file chứng chỉ CA từ hệ thống Mac của bạn
      ca: fs.readFileSync("/etc/ssl/cert.pem"),
      // Đảm bảo Node.js kiểm tra đúng tên miền của server
      rejectUnauthorized: true,
    },
  });

  try {
    const [results] = await connection.query("SELECT * FROM `users`");
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving users");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
