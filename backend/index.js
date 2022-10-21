import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/users", require("./routes/api/users"));

app.use("/api/movies", movieRoutes);

app.listen(3005, () => console.log("Server started"));
