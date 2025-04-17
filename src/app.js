// import "dotenv/config.js"; // se reemplaza por el setenv
import "./helpers/setEnv.helper.js"
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import dbConnect from "./helpers/dbConnect.helper.js";
import routes from "./routes/index.routes.js";
import errorHandler from "./middlawares/errorHandler.mid.js";
import pathHandler from "./middlawares/pathHandler.mid.js";
import setArgsHelper from "./helpers/setArgs.helper.js";

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.static(__dirname + "/public"));

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.use("/", routes);
server.use(errorHandler);
server.use(pathHandler);

server.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`On mode: ${setArgsHelper.mode}`);
});
