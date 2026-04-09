import { Router } from "express";
import { addInventory, getInventory } from "../controllers/inventory.controller.js";

const router = Router();

// POST /inventory
router.post("/", addInventory);

// GET /inventory
router.get("/", getInventory);

export default router;