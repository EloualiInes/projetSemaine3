const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;


// Routes
const routeUser = require("./routes/user.route")

app.use("/api/user", routeUser);

const connect = async() => {
    try{
        await mongoose.connect(dbUrl);
        console.log("Base de donnée connectée");
        app.listen(port, console.log("Server has started at port " + port)) 
    }catch(e){
        console.log("Impossible de démarrer l'appli : ", e)
    }
}
connect();



