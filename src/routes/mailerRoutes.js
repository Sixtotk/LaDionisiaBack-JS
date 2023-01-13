const { Router } = require("express");
const router = Router()

const { transporter } = require("../mailer/mailer");



router.post("/", async (req,res) => {
    const { userEmail, userName } = req.body
    try {
        await transporter.sendMail({
            from: "La Dionisia <ladionisia@gmail.com>",
            to: userEmail,
            subject: "Suscripcion exitosa!",
            html: `<h4> Mensaje para ${userEmail}</h4>
            <p> si este email no te pertenece por favor ignoralo</p>
            <h2> Hola ${userName}</h2>
            Te damos las gracias por suscribirte a "La Dionsia"
            `
        })

        res.status(200).send("Email enviado")
    } catch (error) {
        console.log(error)
    }
} )

module.exports = router;