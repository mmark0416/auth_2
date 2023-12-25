import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.log(error);    
  }
});
