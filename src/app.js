import express from 'express';
import cors from 'cors';
import homeRouter from './Routes/home.route.js';
import aboutRouter from './Routes/about.route.js';
import { serviceRouter } from './Routes/service.route.js';
import { projectRouter } from './Routes/project.route.js';
import { conatctRouter } from './Routes/contact.route.js';
import { socialMediaRouter } from './Routes/socialmedia.route.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/home',homeRouter)
app.use('/api/about',aboutRouter)
app.use('/api/service',serviceRouter)
app.use('/api/project',projectRouter)
app.use('/api/contact',conatctRouter)
app.use('/api/socialmedia',socialMediaRouter)


export default app;