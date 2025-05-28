import transport from "../configs/transportEmail.config.js";

const sendEmailOfRegister = async (email, verifyCode) => {
    await transport.sendMail({
        from: `Michael Test <${process.env.GOOGLE_EMAIL}>`,
        to: email,
        subject: "Verificación de cuenta",
        html: `
            <h1>Bienvenido a alguna empresa</h1>
            <p>Tu codigo de verificacion es:</p>
            <h2>${verifyCode}</h2>
        `,
    });
};

export default sendEmailOfRegister;
