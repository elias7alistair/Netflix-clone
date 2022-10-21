import express from "express";
import { getMovies } from "../controllers/movieController.js";
// import { getMovies } from '../controllers/movieController.js';

const router = express.Router();

router.route("/").post(getMovies);
export default router;
