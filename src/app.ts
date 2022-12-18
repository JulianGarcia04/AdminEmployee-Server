import express, {Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from "./routes"
import {errorHandler, formatError} from './helpers/middlewares/ErrorHandler'
import config from './config';

abstract class Config {
    private _app:Express = express();

    constructor() {
        this._app.set('PORT', config.PORT);
        this._app.use(morgan('dev'));
        this._app.use(cors());
        this._app.use(express.json())
        router(this._app)
        this._app.use(errorHandler)
        this._app.use(formatError)
    }

    protected get app():Express{
        return this._app;
    }
}

export default Config;