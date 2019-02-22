const express = require("express");
const helmet = require("helmet");

const expressRouter = require("./data/express-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/api/", expressRouter);

server.get("/", (req, res) => {
  res.send(`
        <h2>Node Sprint Challenge</h>
        <p>Welcome to the THUNDER-NODE, BABY!!!</p>
      `);
});

module.exports = server;
