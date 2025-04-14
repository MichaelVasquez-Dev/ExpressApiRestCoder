import { Router } from "express";
import passport from "../../middlawares/passport.mid.js"
import { failedRedirect, google, login, online, register, signout } from "../../controllers/auth.controller.js";
import passportCB from "../../middlawares/passportCB.mid.js";
import CustomRouter from "../custom.routes.js";

const router = Router();

// router.post("/register", passport.authenticate("register", { session: false, failureRedirect: '/api/auth/failedRedirect' }), register);
// router.post("/login", passport.authenticate("login", { session: false, failureRedirect: '/api/auth/failedRedirect' }), login);
// router.get("/google", passport.authenticate("google", { scope: [ "email", "profile" ], failureRedirect: '/api/auth/failedRedirect' }));
// router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: '/api/auth/failedRedirect'}), google);
// router.post("/signout", passport.authenticate("jwt", { session: false }), signout);
// router.get("/failedRedirect", failedRedirect)



// router.post("/register", passportCB("register"), register);
// router.post("/login", passportCB('login'), login);
// router.get("/online", passportCB("jwt"), online);
// router.post("/signout", passportCB("jwt"), signout);

// router.get("/google", passport.authenticate("google", { scope: [ "email", "profile" ], failureRedirect: '/api/auth/failedRedirect' }));
// router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: '/api/auth/failedRedirect'}), google);

// router.get("/failedRedirect", failedRedirect)

class AuthRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.create("/register", passportCB("register"), register);
        this.create("/login", passportCB('login'), login);
        this.create("/signout", passportCB("jwt"), signout);
        this.read("/online", passportCB("jwt"), online);

        this.read("/google", passport.authenticate("google", { scope: [ "email", "profile" ], failureRedirect: '/api/auth/failedRedirect' }));
        this.read("/google/callback", passport.authenticate("google", { session: false, failureRedirect: '/api/auth/failedRedirect'}), google);
        
        this.read("/failedRedirect", failedRedirect)
    }

}

const authRouter = new AuthRouter();

export default authRouter.getRoutes();


