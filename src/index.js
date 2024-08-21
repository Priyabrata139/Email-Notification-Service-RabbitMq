const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const mailsender = require("./config/email-config");
const serverConfig = require("./config/server-config");

const { QUEUE } = require("./config");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  await QUEUE.connectQueue();

  console.log("queue is up");
});
