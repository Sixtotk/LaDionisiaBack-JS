const { Router } = require("express");
const router = Router()

const { transporter } = require("../mailer/mailer");



router.post("/", async (req,res) => {
    const { userEmail, newsletter } = req.body

    try {

    if(newsletter){
        await transporter.sendMail({
            from: "La Dionisia <ladionisia@gmail.com>",
            to: userEmail,
            subject: "Suscripcion exitosa!",
            html: `<h4> Mensaje para ${userEmail}</h4>
            <p> si este email no te pertenece por favor ignoralo</p>
                            <h2> ¡Hola!</h2>
            Te damos las gracias por suscribirte a "La Dionsia"
            `
        })
        res.status(200).send("Email de suscripcion enviado")
        
    } else {
        await transporter.sendMail({
            from: "La Dionisia <ladionisia@gmail.com>",
            to: userEmail,
            subject: "Compra realizada!",
            html: `
            <h4> ¡Tu compra ha sido realizada con exito!</h4>
            `
        })
        res.status(200).send("Compra realizada")
    }
    } catch (error) {
        console.log(error)
    }
} )

module.exports = router;