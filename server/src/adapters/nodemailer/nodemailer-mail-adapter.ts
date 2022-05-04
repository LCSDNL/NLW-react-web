import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c7d799d5851043",
      pass: "f2a8a5060d9f5d"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        transport.sendMail({
        from: 'Gasparzinho <Gasp@ghost.com>',
        to: 'Lucas Daniel<lucasdanielrambo@gmail.com>',
        subject,
        html: body,
    });
    };
}