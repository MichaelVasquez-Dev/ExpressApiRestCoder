import Product from "./models/products.model.js"
import User from "./models/users.model.js"


class Manager {
    constructor(model) {
        this.model = model
    }
    create = async (data) => await this.model.create(data)
    readAll = async (filter) => await this.model.find(filter).lean()
    readBy = async (filter) => await this.model.findOne(filter).lean()
    readById = async (_id) => await this.model.findById(_id).lean()
    updateById = async (_id, data) => await this.model.findByIdAndUpdate(_id, data, { new: true })
    deleteById = async (_id) => await this.model.findByIdAndUpdate(_id, { active: false }, { new: true })
}

export default Manager

const usersManager = new Manager(User)
const productsManager = new Manager(Product)
export { usersManager, productsManager }