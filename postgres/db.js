//used for data layer
const pg = require('pg');
const {Client} = pg;
const client = new Client('postgres://localhost/the_acme_db');
const connect();

const SQL = ``

const sync = async () => {
    await client.query(SQL);

}

sync();
