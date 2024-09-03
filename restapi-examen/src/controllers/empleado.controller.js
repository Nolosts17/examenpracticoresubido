import { getConnection } from "../database/database";

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, correo_electronico, puesto, fecha_contratacion, telefono FROM empleados");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, correo_electronico, puesto, fecha_contratacion, telefono FROM empleados WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEmpleado = async (req, res) => {
    try {
        const { nombre, correo_electronico, puesto, fecha_contratacion, telefono } = req.body;

        if (nombre === undefined || correo_electronico === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const empleado = { nombre, correo_electronico, puesto, fecha_contratacion, telefono };
        const connection = await getConnection();
        await connection.query("INSERT INTO empleados SET ?", empleado);
        res.json({ message: "Empleado añadido exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Actualizar un empleado
const updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo_electronico, puesto, fecha_contratacion, telefono } = req.body;

        if (id === undefined || nombre === undefined || correo_electronico === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all required fields." });
        }

        const empleado = { nombre, correo_electronico, puesto, fecha_contratacion, telefono };
        const connection = await getConnection();
        const result = await connection.query("UPDATE empleados SET ? WHERE id = ?", [empleado, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Eliminar un empleado
const deleteEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM empleados WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const empleadoMethods = {
    getEmpleados,
    getEmpleado,
    addEmpleado,
    updateEmpleado,
    deleteEmpleado
};
