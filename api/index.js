import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";

// Configuration
const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));

// Mongoose setup
const PORT = process.env.PORT || 8800;
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(`${err}, did not connect!`);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port: ${PORT}`);
});