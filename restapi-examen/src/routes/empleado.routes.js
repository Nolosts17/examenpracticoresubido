import { Router } from "express";
import { empleadoMethods } from "../controllers/empleado.controller";

const router = Router();

router.get("/", empleadoMethods.getEmpleados);
router.get("/:id", empleadoMethods.getEmpleado);
router.post("/", empleadoMethods.addEmpleado);
router.put("/:id", empleadoMethods.updateEmpleado);
router.delete("/:id", empleadoMethods.deleteEmpleado);

export default router;
