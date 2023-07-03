import express from "express";
import { createPool } from "mysql2";

import {config} from 'dotenv'

const app = express();

console.log({host:process.env.MYSQL_HOST,password:process.env.MYSQLDB_ROOT_PASSWORD,port:process.env.MYSQLDB_DOCKER_PORT})

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: "root",
  password:process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result[0]);
});



app.listen(process.env.NODE_LOCAL_PORT);
console.log(`server is running on port ,${process.env.NODE_LOCAL_PORT}`);
