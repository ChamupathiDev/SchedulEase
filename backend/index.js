import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import scheduleRoutes from './routes/ScheduleRouters.js'
import moodRoutes from './routes/mood.route.js'
import http from 'http';
import { initSocket } from './utils/socket.js';
import adminRoutes from "./routes/user.route.js";


dotenv.config();


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Serve files in the uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use('/api/moods', moodRoutes);
app.use("/api/admin", adminRoutes);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
}
  )


  mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

  server.listen(3000, () => {
    console.log('Server Listening on port 3000!');
    // Initialize WebSocket after server is up
    initSocket(server);
});














