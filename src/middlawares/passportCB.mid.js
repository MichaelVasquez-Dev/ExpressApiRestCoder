import passport from "./passport.mid.js";

const passportCB = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err){
                return next(err)
            }
            if (!user) {
                const error = new Error(info.message || 'Unauthorized from passportCB');
                error.status = info.statusCode || 401;
                return next(error);
            }
            
            req.user = user;
            next();
        })(req, res, next);
    }
}

export default passportCB;