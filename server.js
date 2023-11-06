const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db');
const db = require('./config/mongoose');
const { verifyToken } = require('./utils/validator');

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(express.json());

// Applying JWT validation middleware to all routes starting with /auth
app.all('/auth/*', verifyToken);

const userRouter = require('./src/user/routes');
const gameRouter = require('./src/game/routes');

app.use('/user', userRouter);
app.use('/auth/game', gameRouter);

sequelize.sync().then(() => {
  console.log('Connected to mysql successfully');

  db.on('error', () =>
    console.error('Failed to create connection for mongodb')
  );
  db.once('open', () => {
    console.log('Connected to mongodb successfully');

    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  });
});
