import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app= express();

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c7d799d5851043",
      pass: "f2a8a5060d9f5d"
    }
  });



app.post('/feedbacks', async (req, res)=>{
    const {type, comment, screenshot}= req.body;
    
    const feedback = await prisma.feedbacks.create({
        data:{
            type,
            comment,
            screenshot,
        }
    })

    transport.sendMail({
        from: 'Gasparzinho <Gasp@ghost.com>',
        to: 'Lucas Daniel<lucasdanielrambo@gmail.com>',
        subject:'Novo feedback',
        html:[
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    });

    
    return res.status(201).json({data: feedback});
})

app.listen(3333, ()=>{
    console.log('HTTP server running!')
});