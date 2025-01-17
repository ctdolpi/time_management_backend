import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import bodyParser from "body-parser";
// import connectDB from "./middlewares/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
// app.use((req: Request, res: Response, next: NextFunction) => {
// console.log("Request received");
// connectDB(req, res, next)
// console.log("Request processed");
// });
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api", routes);

// Error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
