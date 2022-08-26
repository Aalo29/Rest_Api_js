import express from "express";
import { endpoints } from "../controllers/index.js";
const router = express.Router();

router.get("/", endpoints);

export default router;
