import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "localhost",
    database: process.env.DATABASE || "gestion_proyectos",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || ""
};
