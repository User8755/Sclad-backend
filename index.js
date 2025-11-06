const express = require('express');
const { getTable, postTable } = require('./controller');
const {createData, createBodyData} = require('./middlewares');
const fileUpload = require('express-fileupload');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3002, MONGODB = 'mongodb://127.0.0.1:27017/test' } = process.env;
const urlList = [
  'https://sclad.tafontend.ru',
];

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

mongoose.connect(MONGODB);

app.use(
  cors({
    origin: urlList,
    credentials: true,
    secure: true,
  })
);

app.get('/', getTable);
app.post('/', createData, postTable);
app.post('/1c', createBodyData, postTable);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message:
      statusCode === 500 ? `На сервере произошла ошибка ${err}` : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
