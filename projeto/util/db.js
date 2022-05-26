
const mysql = require('mysql');

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'projeto',
    multipleStatement: true
});


//abaixo inicia a conexão ao banco

db.connect((erro) => {
    if (erro) {
        throw erro;
    }
    console.log(`Conectado ao banco de dados`)
});

global.db = db;




module.exports = db;