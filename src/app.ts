import express from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.set('port', config.PORT || 3000);

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allRoutes = require('./routes');
app.use('/api', allRoutes);

export default app;