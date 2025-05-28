import dbConnect from "../helpers/dbConnect.helper.js";

const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
    case 'memory':
    break;

    case 'fs':
        {
            console.log('Using File System persistence');
            const { productsManager, usersManager } = await import("./fs/manager.fs.js");
            const { cartsManager } = await import("./fs/carts.fs.js");
            dao = { productsManager, usersManager, cartsManager };
        }

    break;

    default:
        {
            await dbConnect();
            console.log('Using MongoDB persistence');
            const { usersManager, productsManager } = await import("./mongo/manager.mongo.js");
            const { cartsManager } = await import("./mongo/carts.mongo.js");
            dao = { productsManager, usersManager, cartsManager };
        }
    break

}

export const { productsManager, usersManager, cartsManager } = dao;
