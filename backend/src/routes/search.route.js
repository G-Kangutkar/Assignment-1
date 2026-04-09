import { Router } from "express";
import { validateSearchQuery } from "../middlewares/validatesearch.middleware.js";
import { searchInventory } from "../controllers/search.controller.js";


const router = Router();

// GET /search
router.get("/", validateSearchQuery,searchInventory);

export default router;