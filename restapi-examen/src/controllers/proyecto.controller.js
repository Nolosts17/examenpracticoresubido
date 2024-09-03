import { getConnection } from "../database/database";

// Obtener todos los proyectos
const getProyectos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, descripcion, fecha_inicio, fecha_fin FROM proyectos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, descripcion, fecha_inicio, fecha_fin FROM proyectos WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addProyecto = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

        if (nombre === undefined || fecha_inicio === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const proyecto = { nombre, descripcion, fecha_inicio, fecha_fin };
        const connection = await getConnection();
        await connection.query("INSERT INTO proyectos SET ?", proyecto);
        res.json({ message: "Proyecto añadido exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Actualizar un proyecto
const updateProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

        if (id === undefined || nombre === undefined || fecha_inicio === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const proyecto = { nombre, descripcion, fecha_inicio, fecha_fin };
        const connection = await getConnection();
        const result = await connection.query("UPDATE proyectos SET ? WHERE id = ?", [proyecto, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Eliminar un proyecto
const deleteProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM proyectos WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const proyectoMethods = {
    getProyectos,
    getProyecto,
    addProyecto,
    updateProyecto,
    deleteProyecto
};
