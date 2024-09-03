import { Router } from "express";
import { tareaMethods } from "../controllers/tarea.controller";

const router = Router();

router.get("/", tareaMethods.getTareas);
router.get("/:id", tareaMethods.getTarea);
router.post("/", tareaMethods.addTarea);
router.put("/:id", tareaMethods.updateTarea);
router.delete("/:id", tareaMethods.deleteTarea);

export default router;
