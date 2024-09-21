import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from "url";
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as autorization } from "./middlewares/authorization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto ", app.get("port"));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.json());
app.use(cookieParser());


//Rutas
app.get("", autorization.publicOnly, (req, res) => res.sendFile(__dirname + "/pages/index.html"))
app.get("/login", autorization.publicOnly, (req, res) => res.sendFile(__dirname + "/pages/login.html"))
app.get("/signup", autorization.publicOnly, (req, res) => res.sendFile(__dirname + "/pages/signup.html"))
app.get("/cursos", (req, res) => res.sendFile(__dirname + "/pages/cursos.html"))
app.get("/fundamentos-ciberseguridad-capitulo-1", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-1.html"));
app.get("/fundamentos-ciberseguridad-capitulo-2", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-2.html"));
app.get("/fundamentos-ciberseguridad-capitulo-3", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-3.html"));
app.get("/fundamentos-ciberseguridad-capitulo-4", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-4.html"));
app.get("/fundamentos-ciberseguridad-capitulo-5", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-5.html"));
app.get("/introduccion-a-osint", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/cursos/capitulo-1-osint.html"));
app.get("/actividad-1-introduccion-a-ciberseguridad", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/actividad/actividad-1-curso-1.html"))
app.get("/actividad-1-curso-de-osint", autorization.userOnly, (req, res) => res.sendFile(__dirname + "/pages/actividad/actividad-1-curso-1-osint.html"))


app.post("/api/signup", authentication.signup);
app.post("/api/login", authentication.login);