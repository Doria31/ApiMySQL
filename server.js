const express = require('express');
const app = express();
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes.js');
require('dotenv').config(); // Para las variables de entorno

app.set('port', process.env.PORT || 3000);

const dbOptions = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysqldoria31',
    database: process.env.DB_NAME || 'buildmart'
};

// Middleware para la conexión a la base de datos
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

// Usar las rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});
