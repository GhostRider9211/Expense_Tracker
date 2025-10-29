import express ,{type Response,type Request}from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js'
//have to import routes 

dotenv.config({path:'./config.env'});

const app=express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
//app.use(routes);
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


