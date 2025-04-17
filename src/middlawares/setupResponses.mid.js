const setupResponses = (req, res, next) => {
    const { method, url } = req;
    const messages = {
        200: "Success",
        201: "Created",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error"
    };
    const successResponse = (code, response, message = messages[code]) => {
        return res.status(code).json({ response, message, method, url});
    };
    const errorResponse = (code, message = messages[code]) => {
        const error = new Error(message);
        error.statusCode = code;
        throw error;
    };

    res.json200 = (response, message) => successResponse(200, response, message);
    res.json201 = (response, message) => successResponse(201, response, message);
    res.json400 = (message) => errorResponse(400, message);
    res.json401 = (message) => errorResponse(401, message);
    res.json403 = (message) => errorResponse(403, message);
    res.json404 = (message) => errorResponse(404, message);
    res.json500 = (message) => errorResponse(500, message);
    next();
}

export default setupResponses;