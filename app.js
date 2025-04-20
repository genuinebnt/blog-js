import express from "express";
const app = express();
const port = 3000;

app.get("/v1/healthcheck", (req, res) => {
  res.sendStatus(200);
});

export default app;
