const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: '22375',
  host: 'localhost',
  port: 5432,
  database: 'contact_center',
})

module.exports = pool
