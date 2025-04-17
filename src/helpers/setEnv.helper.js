
import { config } from "dotenv";
import args from "./setArgs.helper.js";

const { mode } = args
const path = ".env"+(mode ? "."+mode : ".dev");

config({ path });

const MONGO_URL = process.env.MONGO_URL
const COOKIE_SECRET = process.env.COOKIE_SECRET
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET =  process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

export default { MONGO_URL, COOKIE_SECRET, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, PORT };