const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require('./models/db');
const userRouter = require("./router/userRouter");
const favouriteRouter = require("./router/favouriteRouter");
const tweetRouter = require("./router/tweetRouter");

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/user",userRouter)
app.use("/favourite",favouriteRouter);
app.use("/tweet",tweetRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})