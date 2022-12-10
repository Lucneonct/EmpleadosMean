import express, { Application, urlencoded } from 'express';
import indexRoutes from './routes/indexRoutes';
import morgan from 'morgan';
import corst from 'cors';
import mongoose, { Connection } from 'mongoose';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.database();
        this.config();
        this.routes();
    }

    database(): void {
        const mongoDB = "mongodb://127.0.0.1/mean_empelados";
        mongoose.connect(mongoDB);
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("Database connected");
        })
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(corst());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(indexRoutes)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();