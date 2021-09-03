const Client = require('pg').Client
const dbClient = new Client({
    user: "postgres",
    password: "123",
    host: "127.0.0.1",
    port: "5432",
    database: "postgres"
})

module.exports = dbClient