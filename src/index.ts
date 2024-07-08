const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')

const routes = require('../routes/routes.js')

app.use(bodyParser.json())

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(express.static(path.join('\\litterisinventum')));

app.use(routes)

app.listen(3080, () => {
    console.log('Servidor rodando na porta 3000...');
});
