import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function userOnly(req, res, next){
    const logged = checkCookie(req);
    if(logged) return next();
    return res.redirect("/")
}

function publicOnly(req, res, next){
    const logged = checkCookie(req);
    if(!logged) return next();
    return res.redirect("/cursos")
}

function checkCookie(req) {
    try {
        console.log(req.headers.cookies);
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        console.log(cookieJWT)
        const decodeCookie = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        console.log(decodeCookie);
        const checkUser = usuarios.find(usuario => usuario.user === decodeCookie.user);
        if(!checkUser) {
            return false;
        }
        return true;
    }
    catch {
        return false;
    }
}

export const methods = {
    userOnly,
    publicOnly
}