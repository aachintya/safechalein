import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userroute from "../Backend/route/user.route.js"
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

dotenv.config();


const port= process.env.PORT || 3000;


try{
     mongoose.connect("mongodb+srv://auxin:auxin@cluster0.4seli.mongodb.net/safechalein"
    );
    
   console.log("connected to mongodb!")
} catch (error)
{
    console.log("Error:",error)
}

app.use("/user",userroute);





app.listen(port, () =>{
    console.log(`app running on port ${port}`);
});



