import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'carlosguerra2001.2@gmail.com', // generated ethereal user
        pass: 'mnatcofytoejwsfl', // generated ethereal password
    },

});

transporter.verify()
    .then(() => {
        console.log('Nodemailer funcionando correctamente')
    })
    .catch(err => {
        console.log('Ha ocurrido un error')
    })