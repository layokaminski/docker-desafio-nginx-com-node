const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');


const createTable = `
  CREATE TABLE IF NOT EXISTS people(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(id))`;
const sql = `INSERT INTO people(name) values('Layo')`;
const select = `SELECT * FROM people`;

app.get('/', async (_, res) => {
  const connection = mysql.createConnection(config);
  connection.query(createTable);
  connection.query(sql);
  connection.query(select, (_, peoples) => {
    let result = '<h1>Full Cycle Rocks!</h1>';

    for (const people of peoples) {
      result += `<li>${people.name}</li>`
    };

    connection.end();

    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
});