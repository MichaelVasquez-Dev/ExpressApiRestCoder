const errorHandler = (err, req, res, next) => {
    const message = err.message || "Internal Server Error";
    const status = err.statusCode || 500;

    return res.status(status).json({
        error: true,
        message,
        status,
        method: req.method,
        url: req.url,
    });
};

export default errorHandler;