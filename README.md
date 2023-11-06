# tfg-task

To start the project follow these steps:

- npm i
- create .env file in root directory and add env variables from .env.example file
- update all the variables in .env with your values
- node server.js (to run server)
  This should start the server on the given port in .env or 5000.

- node rabbitmq/registerUser.subscriber.js (to run rabbitmq subscriber)

- Now you can test all the APIs one by one on postman or any suitable tool

Note: Make sure that your mysql_server, mongo_server and rabbitmq_server are up and running.
