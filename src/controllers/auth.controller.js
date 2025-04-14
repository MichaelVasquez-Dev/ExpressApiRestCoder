const register = async (req, res, next) => {
  try {
    const user = req.user;
    res.cookie("token", req.token, { maxAge: 1000 * 60 * 60 , httpOnly: true }).json200( user, "Usuario creado correctamente" );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = req.user;
    res.cookie("token", req.token, { maxAge: 1000 * 60 * 60 , httpOnly: true }).status(200).json({ user });
  } catch (error) {
    res.json({ user });
    next(error);
  }
};

const online = async (req, res, next) => {
  try {
    const user = req.user;
    res.json200( user, "Usuario logueado correctamente" );
  } catch (error) {
    next(error);
  }
}

const signout = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Logout" });
  } catch (error) {
    next(error);
  }
}

const failedRedirect = async (req, res, next) => {
  try {
    const error = new Error("Error, redireccionando");
    error.message = "Error, redireccionando";
    error.status = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    next(error);
  }
};


export { register, login, online, signout, failedRedirect, google };