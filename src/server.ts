import { config } from "./api/config/config";
import express from "express";
import http from 'http';
import mongoose, { startSession } from "mongoose";
import Logging from "./api/library/Logging";
import authorRoutes from './api/routes/AuthorRoutes';


const app = express();

mongoose.connect(config.mongo.url, { retryWrites: true, writeConcern: { w: "majority" } })
    .then(() => {
        Logging.info('Connected to mongoDB');
        start();
    })
    .catch(() => { Logging.error('unable to Connect..') });

/** only start the server if Mongo Connects */
const start = () => {
    app.use((req, res, next) => {
        /**Log the request */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /**Log the response */
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);

        });
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());


    /** Rulles of our API */
    app.use((req, res, next) => {

        res.header('Acess-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested_With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /**Routes */
    app.use('/authors', authorRoutes);


    /** Healthcheck */
    app.get('/ping', (res, req, next) => { req.status(200).json({ message: 'pong' }) });

    /**Error handling */
    app.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => { Logging.info(`Server runs on PORT ${config.server.port}`) })
};