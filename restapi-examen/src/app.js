import express from "express";
import morgan from "morgan";
import cors from "cors";
import proyectoRoutes from './routes/proyecto.routes';
import empleadoRoutes from './routes/empleado.routes';
import tareaRoutes from './routes/tarea.routes';
import asignacionTareaRoutes from './routes/asignacion_tarea.routes';

const app = express();
app.use(cors());

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/proyectos', proyectoRoutes); // Rutas para proyectos
app.use('/api/empleados', empleadoRoutes); // Rutas para empleados
app.use('/api/tareas', tareaRoutes); // Rutas para tareas
app.use('/api/asignaciones-tareas', asignacionTareaRoutes); // Rutas para asignaciones de tareas

export default app;

