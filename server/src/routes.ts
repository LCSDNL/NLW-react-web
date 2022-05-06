import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from './UseCase/submit-feedback-UseCase';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express';



export const routes = express.Router();



routes.post('/feedbacks', async (req, res)=>{
    const {type, comment, screenshot}= req.body;
    
    const prismaFeedbacksRepository= new PrismaFeedbacksRepository()
    const nodemailerMailAdapter= new NodemailerMailAdapter()


    const submitFeedbackService = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    })

    

    
    return res.status(201).send();
})