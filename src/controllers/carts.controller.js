const createOne = (req, res, next) => {
    return res.send("Create")
}

const readAll = (req, res, next) => {
    return res.send("ReadAll")
}

const readOne = (req, res, next) => {
    return res.send("ReadOne")

}

const updateOne = (req, res, next) => {
    return res.send("Update")
}

const deleteOne = (req, res, next) => {
    return res.send("DeleteOne")
}

const cidParams = (req, res, next, id) => {
    const isObjectId = Types.ObjectId.isValid(id);

    if (!isObjectId) {
        const error = new Error("Invalid id format");
        error.status = 400;
        next(error);
    }
    next();
}

export { createOne, readAll, readOne, updateOne, deleteOne, cidParams };