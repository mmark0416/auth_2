import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import "express-async-errors";

//middleware
import errorHandler from "./middleware/errorHandler.js";

//Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
