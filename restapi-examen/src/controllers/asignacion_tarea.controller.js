import { getConnection } from "../database/database";

// Obtener todas las asignaciones de tareas
const getAsignacionesTareas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_tarea, id_empleado, fecha_asignacion, fecha_entrega FROM asignaciones_tareas");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Obtener una asignación de tarea específica
const getAsignacionTarea = async (req, res) => {
    try {
        const { id_tarea, id_empleado } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_tarea, id_empleado, fecha_asignacion, fecha_entrega FROM asignaciones_tareas WHERE id_tarea = ? AND id_empleado = ?", [id_tarea, id_empleado]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Añadir una nueva asignación de tarea
const addAsignacionTarea = async (req, res) => {
    try {
        const { id_tarea, id_empleado, fecha_asignacion, fecha_entrega } = req.body;

        if (id_tarea === undefined || id_empleado === undefined || fecha_asignacion === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const asignacion = { id_tarea, id_empleado, fecha_asignacion, fecha_entrega };
        const connection = await getConnection();
        await connection.query("INSERT INTO asignaciones_tareas SET ?", asignacion);
        res.json({ message: "Asignación de tarea añadida exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Actualizar una asignación de tarea
const updateAsignacionTarea = async (req, res) => {
    try {
        const { id_tarea, id_empleado } = req.params;
        const { fecha_asignacion, fecha_entrega } = req.body;

        if (id_tarea === undefined || id_empleado === undefined || fecha_asignacion === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const asignacion = { fecha_asignacion, fecha_entrega };
        const connection = await getConnection();
        const result = await connection.query("UPDATE asignaciones_tareas SET ? WHERE id_tarea = ? AND id_empleado = ?", [asignacion, id_tarea, id_empleado]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Eliminar una asignación de tarea
const deleteAsignacionTarea = async (req, res) => {
    try {
        const { id_tarea, id_empleado } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM asignaciones_tareas WHERE id_tarea = ? AND id_empleado = ?", [id_tarea, id_empleado]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const asignacionTareaMethods = {
    getAsignacionesTareas,
    getAsignacionTarea,
    addAsignacionTarea,
    updateAsignacionTarea,
    deleteAsignacionTarea
};
