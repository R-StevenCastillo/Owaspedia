import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    
}]

async function login(req, res) {
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send({status: "Error", message: "Los campos estan incopletos"});
    }
    const checkUser = usuarios.find(usuario => usuario.user === user);
    if (!checkUser) {
        return res.status(400).send({status: "Error", message: "Error durante el login"});
    }
    const logSuccess = await bcryptjs.compare(password, checkUser.password);
    if(!logSuccess) {
        return res.status(400).send({status: "Error", message: "Error durante el login"});
    }
    const token = jsonwebtoken.sign({user:checkUser.user} ,
        process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRATION})

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,),
        path: "/"
    }

    res.cookie("jwt", token, cookieOption);
    res.send({status: "ok", message: "Usuario ha ingresado", redirect: "/cursos"});
}

async function signup(req, res) {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if (!user || !email || !password) {
        return res.status(400).send({status: "Error", message: "Los campos estan incopletos"});
    }
    const checkUser = usuarios.find(usuario => usuario.user === user);
    if (checkUser) {
        return res.status(400).send({status: "Error", message: "Este usuario ya existe"});
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt)
    const newUser = {
        user, email, password: hashPassword
    }

    usuarios.push(newUser);
    console.log(usuarios);
    return res.status(201).send({status: "ok", message: `Usuario ${newUser.user} agregado`, redirect: "/"})
}

export const methods = {
    login,
    signup
}