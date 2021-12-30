// Импорты Аполло и Експресс
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();

//Ограничения для API
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

// Пакет Express Helmet для большей безопасности
const helmet = require('helmet');
// Добавляем промежуточное ПО Express Helmet
app.use(helmet());

// Пакет CORS, позволяющий выполнять запрос ресурсов из другого домена
const cors = require('cors');
// Добавляем промежуточное ПО CORS
app.use(cors());

const jwt = require('jsonwebtoken');
// Получаем информацию пользователя из JWT
const getUser = token => {
  if (token) {
    try {
      // Возвращаем информацию пользователя из токена
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Если с токеном возникла проблема, выбрасываем ошибку
      new Error('Session invalid');
    }
  }
};

//Подключаем файл .env и db.js и note.js
require('dotenv').config();
const db = require('./db');
const models = require('./models');

//Запуск сервера на 4000 порте, либо который указан в .env
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//Схемы GraphQL
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Подключение к БД
db.connect(DB_HOST);

// Настройка Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // Получаем токен пользователя из заголовков
    const token = req.headers.authorization;
    // Пытаемся извлечь пользователя с помощью токена
    const user = await getUser(token);
    // Пока что будем выводить информацию о пользователе в консоль:
    console.log(user);
    // Добавляем модели БД и пользователя в контекст
    return { models, user };
  }
});
//Промежуточное ПО для тестов API
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('В разработке'));
app.listen(port, () =>
  console.log(`Local server is running at http://localhost:${port}`)
);
