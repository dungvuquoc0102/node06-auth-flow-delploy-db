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
    port: "4000",
    user: "3bDShXot2FVxLsD.root",
    password: "PRuR9DXN8PB4wfIx",
    database: "ecommerce_practice",
    ssl: {
      ca: fs.readFileSync(__dirname + "/isrgrootx1.pem"),
      rejectUnauthorized: true,
    },
  });

  // Get all users
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
