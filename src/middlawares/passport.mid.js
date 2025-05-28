import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { createHash, isValidPassword } from "../helpers/hash.helper.js";
import { usersManager } from "../dao/factory.dao.js";
import { createToken } from "../helpers/token.helper.js";
import UserDTO from "../dto/users.dto.js";
import sendEmailOfRegister from "../helpers/sendEmailOfRegister.helper.js";

passport.use("register", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
    }, 
    async (req, email, password, done) => {
        const { first_name, last_name } = req.body;

        if (!first_name || !last_name ) return done(null, null, { message: "Faltan datos", statusCode: 400 });
        if (await usersManager.readBy({ email })) return done(null, null, { message: "El usuario ya existe", statusCode: 400 });
        
        const newUser = new UserDTO( req.body );
        const user = await usersManager.create( newUser );
        
        await sendEmailOfRegister(email, user.verifyCode);

        req.token = createToken({ _id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role });
        done(null, user, null); 
    }
));

passport.use("login", new LocalStrategy(
    { 
        passReqToCallback: true,
        usernameField: "email",
    }, 
    async (req, email, password, done) => {
        const user = await usersManager.readBy({ email, isGoogleUser: false });
        if (!user || !isValidPassword(user, password)) return done(null, null, { message: "Email o Contraseña incorrectos", statusCode: 401 });
        req.token = createToken({ _id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role });
        done(null, user, null);
    }
));

passport.use("google", new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        // passReqToCallback: true, //si se activa toca colocar el req en la funcion de callback (req, accessToken, refreshToken, profile, done)
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await usersManager.readBy({ email: profile.id, isGoogleUser: true });
            if(!user){
                const newUser = {
                    first_name: profile.given_name,
                    last_name: profile.family_name || 'google',
                    date: new Date(),
                    email: profile.id,
                    password: createHash(profile.id),
                    isGoogleUser: true,
                };
                user = await usersManager.create(newUser);
            }
            done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use("jwt", new JWTStrategy(
    {
        // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJwt.fromExtractors([
            req => req.cookies.token,
        ]),
        secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
        const user = await usersManager.readBy({ email: jwtPayload.email });
        if (!user) return done(null, null, { message: "El usuario no existe", statusCode: 401 });
        done(null, user);
    }
));

passport.use("admin", new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {

        const { id, role } = jwtPayload;
        const user = await usersManager.readBy({ _id: id });
        if (!user) return done(null, null, { message: "El usuario no existe", statusCode: 401 });
        if (role !== "ADMIN") return done(null, null, { message: "No tienes permisos para acceder a esta ruta", statusCode: 403 });

        done(null, user);
    }
));




export default passport;