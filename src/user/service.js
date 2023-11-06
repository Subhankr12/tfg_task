const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
const { User } = require('../../models');
const { EXCHANGE_NAMES } = require('../../utils/common');

const rabbitMQServer = process.env.RABBITMQ_CONNECTION_URL;

const registerUser = async (params) => {
  const { username, email, password } = params;
  const user = await User.create({ username, email, password });

  // Sending a message to RabbitMQ exchange
  const connection = await amqp.connect(rabbitMQServer);
  const channel = await connection.createChannel();
  const exchangeName = EXCHANGE_NAMES.REGISTER_USER;

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });
  await channel.publish(
    exchangeName,
    '',
    Buffer.from(`User ${username} registered.`)
  );

  return user;
};

const loginUser = async (params) => {
  const { username } = params;
  const user = await User.findOne({ where: { username } });

  const token = jwt.sign(
    { username: user.username, userId: user.id, email: user.email },
    process.env.JWT_SECRET_KEY
  );

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
