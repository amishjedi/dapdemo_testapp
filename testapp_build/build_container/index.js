const express = require('express')
const sql = require('mssql')
const app = express()

const sqlConfig = {
  user: process.env.DB_UNAME,
  password: process.env.DB_PASSWORD,
  server: 'epmsvr01.CYBR.COM',
  database: 'master'
}

app.get('/', (req, res) => {
  res.send(process.env.DB_UNAME + '::' + process.env.DB_PASSWORD)
})

app.get('/liveness', async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig)
    console.log('POOL :: ', pool.config)
    res.send(200)
    pool.close()
  } catch (err) {
    console.log('ERROR :: ', err.code)
    if (err.code === 'ELOGIN') {
      res.send(500)    
    } else {
      res.send(200)
    }
  }
})

app.listen(1234, () => console.log('Listening on port 1234'))