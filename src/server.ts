import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";
import pgsession from "connect-pg-simple";

import db from './shared/db/db.js'; 
import env from './config/env.js';
import errorMiddleware from './shared/Middlewares/error.middleware.js';

const server = express();
const port = env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PgStore = pgsession(session)


server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser());

server.use(
  "/assets",
  express.static(path.join(__dirname, "../assets"))
);

const secret = env.SESSION_SECRET;

server.use(session({

    store: new PgStore({
        pool: db,
        createTableIfMissing: true
    }),

    secret,
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))



server.use(errorMiddleware)
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})