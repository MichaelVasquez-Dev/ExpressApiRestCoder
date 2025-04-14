# ExpressApiRestCoderimport { Router } from "express";

const router = Router();

//funciones
const create = (req, res, next) => {
    try {
        return res.send("Create")
    } catch (error) {
        next(error)
    }
}
const readAll = (req, res, next) => {
    try {
        return res.send("ReadAll")
    } catch (error) {
        next(error)
    }
}
const readOne = (req, res, next) => {
    try {
        return res.send("ReadOne")
    } catch (error) {
        next(error)
    }
}
const update = (req, res, next) => {
    try {
        return res.send("Update")
    } catch (error) {
        next(error)
    }
}
const deleteOne = (req, res, next) => {
    try {
        return res.send("DeleteOne")
    } catch (error) {
        next(error)
    }
}

router.post("/", create)
router.get("/", readAll)
router.get("/:id", readOne)
router.put("/:id", update)
router.delete("/:id", deleteOne)

export default router