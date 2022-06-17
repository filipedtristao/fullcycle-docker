const express = require("express");
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)

connection.query(`
    CREATE TABLE IF NOT EXISTS people (
        id int not null AUTO_INCREMENT,
        name varchar(200),
        PRIMARY KEY(id)
    )
`)

connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    
    connection.query(`INSERT INTO people (name) values ('Foo')`, () => {
        connection.query('SELECT * FROM people', (error, result) => {
            const list = '<ul>' + result.map(item => `<li>${item.id} - ${item.name}</li>`).join('') + '</ul>'
            
            res.send(`<h1>Full Cycle Rocks!</h1>${list}`)

            connection.end()
        })
    })
})

app.listen(port, ()=> {
    console.log(`App started at ${port}`)
})