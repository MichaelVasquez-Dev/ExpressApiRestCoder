import { Router } from "express";

const router = Router();

const setCookie = (req, res, next) => {
    try {
        const maxAge = 1000 * 60 * 60 * 24;
        const message = "cookie Seted";
        res.cookie("user_id", "asdf323fa3f2fds1d1d1", { maxAge, signed: true })
        .cookie("modo", "oscuro", { maxAge })

        .json({ message });
    } catch (error) {
        next(error);
    }
}
const readCookie = (req, res, next) => {
    try {
        const cookie = req.cookies;
        const cookieSigned = req.signedCookies;
        console.log(cookie);
        if (!cookie && !cookieSigned ) return res.status(400).json({ message: "No hay cookie" });
        res.json({ cookie, cookieSigned });
    } catch (error) {
        next(error);
    }
}
const deleteCookie = (req, res, next) => {
    try {
        res.clearCookie("modo").clearCookie("user_id").json({ message: "cookie deleted" });
    } catch (error) {
        next(error);
    }
}

router.get("/setCookie", setCookie);
router.get("/readCookie", readCookie);
router.get("/deleteCookie", deleteCookie);


export default router;