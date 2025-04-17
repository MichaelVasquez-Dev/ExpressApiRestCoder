const login = (req, res) => {
    try {
        res.render("login", { title: "Login form" });
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";
        res.status(status).render("error", { status, message });
        
    }
}
const register = (req, res) => {
    try {
        res.render("register", { title: "Register form" });
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";
        res.status(status).render("error", { status, message });
    }
}

export { login, register };