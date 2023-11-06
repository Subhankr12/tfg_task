const amqp = require('amqplib');
const fs = require('fs');
const { EXCHANGE_NAMES } = require('../utils/common');
require('dotenv').config();

const rabbitMQServer = process.env.RABBITMQ_CONNECTION_URL;
const exchangeName = EXCHANGE_NAMES.REGISTER_USER;

const startSubscriber = async () => {
  const connection = await amqp.connect(rabbitMQServer);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(queue, exchangeName, '');

  channel.consume(
    queue,
    (msg) => {
      const logData = msg.content.toString();
      console.log('Logging:', logData);

      // Logging to a file
      fs.appendFile('register_user_log.txt', logData + '\n', (err) => {
        if (err) throw err;
        console.log('Logged to file.');
      });
    },
    { noAck: true }
  );
};

startSubscriber().catch(console.error);
