var dotenv = require('dotenv');

dotenv.load();
console.log(process.env);
module.exports = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
};
