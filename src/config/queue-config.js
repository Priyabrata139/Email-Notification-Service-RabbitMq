const amqplib = require("amqplib");

const { EmailService } = require("../services");
// const { ServerConfig } = require("./index");
const ServerConfig = require("./server-config");

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue", async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      // const object = JSON.parse(Buffer.from(data).toString());
      await EmailService.sendEmail(
        `${ServerConfig.GMAIL_EMAIL}`,
        object.recepientEmail,
        object.subject,
        object.text
      );
      channel.ack(data);
    });
  } catch (error) {
    console.log("errror=", error);
  }
}

module.exports = {
  connectQueue,
};
