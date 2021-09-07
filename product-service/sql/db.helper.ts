import { Client } from "pg";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};

export const invoke = async (query, data = []) => {
    const client = new Client(dbOptions);
    console.log('11111');
    await client.connect();

    try {
        console.error('222222');
        return await client.query(query, data);

    } catch (error) {
        console.error('33333');
        console.error('DB error', error.message);
    } finally {
        client.end();
    }
}