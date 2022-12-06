import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
const cors = require("cors");
const bodyParser = require("body-parser");
import { failureWord, successWord, translateWord } from "./src";
import { fetchWord } from "./db";
import init from "./init";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());

app.post("/word", async (req: Request, res: Response) => {
  const number = Number(req.body.score);
  const word = await fetchWord(number);
  const translation = await translateWord(word);
  res.json({ word, translation });
});

app.post("/success", async (req: Request, res: Response) => {
  const word = String(req.body.word);
  await successWord(word);
  res.status(200).end();
});

app.post("/failure", async (req: Request, res: Response) => {
  const word = String(req.body.word);
  await failureWord(word);
  res.status(200).end();
});

init().then(() => {
  app.listen(port, async () => {
    console.log(`Server is running at https://localhost:${port}`);
  });
});
