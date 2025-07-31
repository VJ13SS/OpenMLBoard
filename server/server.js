import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

//initialize express
const app = express();

//configure dotenv
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

//connect to db
await connectDB();

//Routes
app.get("/", (req, res) => res.send("API WORKING"));
app.use("/api/user", userRouter);
app.use('/api/projects',projectRouter)
app.use('/api/admin',adminRouter)
app.use('/api/comments',commentRouter)

//port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
