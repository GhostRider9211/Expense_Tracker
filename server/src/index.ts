import express ,{type Response,type Request}from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js'
import route from './routes/route.js'
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path:path.resolve(__dirname,"../.env"),
});


const app=express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use(route);
app.use('/api/auth',authRoutes);
app.get('/',(_req:Request,res:Response)=>{
    res.send('API Running');
})

connectDB()
.then((db)=>{
    if(!db) process.exit(1);
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
   

})
.catch((error)=>{
console.error('MongoDB connection failed:',error);

});
