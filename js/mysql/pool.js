const express = require('express')
const app = express()

const PORT = process.env.PORT || 4444

var mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user: 'testuser',
    password: 'testpass',
    database: 'aliconcon',
    connectionLimit: 10
})

app.get('/pool', (req, res) => {
    pool.query('select * from users limit 10', (error, records, fields)=>{
        if (error) {
            console.log(`error:::`, error)
            res.send(error)
            return
        }
        console.log(`records[0]:1111::`, records)
        res.send(records[0])
        // pool.end()
    })
})

app.get('/connectpool', (req, res) => {
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(`error:11::`, err);
        }
        conn.query('select * from users limit 10', (error, records, fields)=>{
            if (error) {
                console.log(`error:::`, error)
                res.send(error)
                return
            }
            console.log(`records[0]:3333::`, records)
            res.send(records[0])
        })
        pool.releaseConnection(conn)
    })
})

app.listen(PORT, ()=>{
    console.log(`Server runing at ${PORT}`)
})