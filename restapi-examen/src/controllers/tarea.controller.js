import { getConnection } from "../database/database";

// Obtener todas las tareas
const getTareas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, titulo, descripcion, id_proyecto, estado FROM tareas");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, titulo, descripcion, id_proyecto, estado FROM tareas WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addTarea = async (req, res) => {
    try {
        const { titulo, descripcion, id_proyecto, estado } = req.body;

        if (titulo === undefined || id_proyecto === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const tarea = { titulo, descripcion, id_proyecto, estado };
        const connection = await getConnection();
        await connection.query("INSERT INTO tareas SET ?", tarea);
        res.json({ message: "Tarea añadida exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Actualizar una tarea
const updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, id_proyecto, estado } = req.body;

        if (id === undefined || titulo === undefined || id_proyecto === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const tarea = { titulo, descripcion, id_proyecto, estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tareas SET ? WHERE id = ?", [tarea, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Eliminar una tarea
const deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM tareas WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const tareaMethods = {
    getTareas,
    getTarea,
    addTarea,
    updateTarea,
    deleteTarea
};
