import { createTransport } from "nodemailer";

const transport = createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 465, // || 587 || 25,
    secure: true, 
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
    },
})

export default transport;