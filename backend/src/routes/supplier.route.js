import { Router } from "express";
import { addSupplier } from "../controllers/supplier.cntroller.js";


const router = Router();

// POST /supplier
router.post("/", addSupplier);

export default router;