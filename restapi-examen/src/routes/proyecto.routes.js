import { Router } from "express";
import { proyectoMethods } from "../controllers/proyecto.controller";

const router = Router();

router.get("/", proyectoMethods.getProyectos);
router.get("/:id", proyectoMethods.getProyecto);
router.post("/", proyectoMethods.addProyecto);
router.put("/:id", proyectoMethods.updateProyecto);
router.delete("/:id", proyectoMethods.deleteProyecto);

export default router;
