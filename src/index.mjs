import express from 'express';
import mongoose from 'mongoose';
import router from './routes/route.mjs'

const app = express();


mongoose.connect('mongodb+srv://ilyaasmis17:8080gruug@cluster0.wumbsod.mongodb.net/BooksLib').then(()=>console.log("Database Connected")).catch(err=>console.log(err));

app.use('/', router);

app.listen(8000, ()=>console.log("Server connected at localhost : ",8000));