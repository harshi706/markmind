const express=require('express')
const connect=require('./db');
const router=require('./routes/auth')
const routers=require('./routes/notes')
const cors=require('cors')

connect();
const app=express();
const PORT=8000;
app.use(cors());
app.use(express.json())

app.use('/api/auth',router)
app.use('/api/notes',routers)

app.listen(PORT);