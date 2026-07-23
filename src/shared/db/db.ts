import pkg from 'pg';
import AppError from '../Utilities/appError.js';
import env from '../../config/env.js';


const { Pool } = pkg;


const DBURL = env.DB_URL;

const db = new Pool({
    connectionString : DBURL,
    max:20
});

export default db;
