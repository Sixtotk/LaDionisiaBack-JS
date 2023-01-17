const { Router } = require("express");
const router = Router()
const { transporter } = require("../mailer/mailer");


router.post("/", async (req,res) => {
    const { userEmail, newsletter, products } = req.body

    try {

        if (newsletter) {
            await transporter.sendMail({
                from: "La Dionisia <ladionisiapf@gmail.com>",
                to: userEmail,
                subject: "Suscripcion exitosa!",
                html: `<h4> Mensaje para ${userEmail}</h4>
            <p> si este email no te pertenece por favor ignoralo</p>
                            <h2> ¡Hola!</h2>
            Te damos las gracias por suscribirte a "La Dionsia"
            `
            })
            res.status(200).json("Email de suscripcion enviado")

        } else {
            await transporter.sendMail({
                from: "La Dionisia <ladionisiapf@gmail.com>",
                to: userEmail,
                subject: "Compra realizada!",
                html: `
            <h4> ¡Tu compra de los siguientes productos ha sido realizada con exito!</h4>
            <ul>
            ${products.map(p => {
                    `<li>${p}</li>`
                })}
            </ul>
            `
            })
            res.status(200).json("Compra realizada")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;