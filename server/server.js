import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();
connectDB();
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => res.send("server is ready"));
// }

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => console.log("Server Started at " + port));
