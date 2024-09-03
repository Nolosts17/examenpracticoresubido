import { Router } from "express";
import { asignacionTareaMethods } from "../controllers/asignacion_tarea.controller";

const router = Router();

router.get("/", asignacionTareaMethods.getAsignacionesTareas);
router.get("/:id_tarea/:id_empleado", asignacionTareaMethods.getAsignacionTarea);
router.post("/", asignacionTareaMethods.addAsignacionTarea);
router.put("/:id_tarea/:id_empleado", asignacionTareaMethods.updateAsignacionTarea);
router.delete("/:id_tarea/:id_empleado", asignacionTareaMethods.deleteAsignacionTarea);

export default router;
