"use strict";
const express = require('express');
const app = express();
const multer = require("multer");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const CLIENT_ERROR = 400;
const SERVER_ERROR = 500;

app.post("/searchchallenge", async (req, res) => {
  let db = await getDBConnection();
  let qry = "SELECT * FROM challenge WHERE search='" + req.body["search"] + "'";
  let challengeText = null;
  try {
    challengeText = await db.all(qry);
  } catch (error) {
    challengeText = error;
  }
  db.close();
  res.type("text").send(challengeText);
});

async function getDBConnection() {
  const db = await sqlite.open({
    filename: "challenge.db",
    driver: sqlite3.Database
  });
  return db;
}

const portNum = 8000;
app.use(express.static('public'));
const PORT = process.env.PORT || portNum;
app.listen(PORT);