import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'



const app = express();

dotenv.config();

                app.use(bodyParser.json({limit: "30mb", extended: true}));
                app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
                //outdated use of express. Express now has it's own body parser. 


app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended:true, limit:"30mb" }));

//this is because we are going ot be sending images and we need to put a cap on it.
//here we are using the bodyparser so we can send our requests.

app.use(cors());
//just call it as a function

app.use('/posts', postRoutes);
//useing express
//set starting path for all routes inside the posts.js. 
//every route from postRoutes will start in posts.

//NEED TO SPECIFY ROUTEES AFTER APP.USE CORS

const CONNECTION_URL = 'mongodb+srv://mhykim:firstbigdog@cluster0.jjaz8w1.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;
//creates a port

//mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(CONNECTION_URL)
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        //the then is what we do if our connection is succesful
        //listen accepts the port, and a callback function which runs when the app succesfully listens.
        //use the apostrophe on the top left to print out strings that are variables
        .catch((error) => console.log(error.message));
        //catch is if the connection is unsuccesful

//mongoose.set('useFindAndModify', false)
//QUESTION: ensures that we don't have any warnings in console but not sure why we need to take it out???
//Now our server is successfully connected to the database.

//use mongooes too connect to the database which takes in botht he connection URL and an object with all the different options
