const  { Client }  = require('pg')

const databaseConfig = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'rendy_backend_2',
    port: 5432,
    password: 'Rendy1818*'
})

module.exports = databaseConfig