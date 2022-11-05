"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./api/config/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("./api/library/Logging"));
const AuthorRoutes_1 = __importDefault(require("./api/routes/AuthorRoutes"));
const BookRoutes_1 = __importDefault(require("./api/routes/BookRoutes"));
const app = (0, express_1.default)();
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, writeConcern: { w: "majority" } })
    .then(() => {
    Logging_1.default.info('Connected to mongoDB');
    start();
})
    .catch(() => { Logging_1.default.error('unable to Connect..'); });
/** only start the server if Mongo Connects */
const start = () => {
    app.use((req, res, next) => {
        /**Log the request */
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /**Log the response */
            Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
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
    app.use('/authors', AuthorRoutes_1.default);
    app.use('/books', BookRoutes_1.default);
    /** Healthcheck */
    app.get('/ping', (res, req, next) => { req.status(200).json({ message: 'pong' }); });
    /**Error handling */
    app.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(app).listen(config_1.config.server.port, () => { Logging_1.default.info(`Server runs on PORT ${config_1.config.server.port}`); });
};
