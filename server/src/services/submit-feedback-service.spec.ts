import { SubmitFeedbackService } from "./submit-feedback-service";



describe('Submit feedback', ()=>{

    const submitFeedback= new SubmitFeedbackService(
        { create: async ()=>{} },
        { sendMail: async ()=>{} },
    )

    
    it('should be able to submit a feedback', async ()=>{
         
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example',
            screenshot:'data:image/png;base64',
        })).resolves.not.toThrow();
    });

    
    it('should not be able to submit a feedback without type', async ()=>{
         
        await expect(submitFeedback.execute({
            type:'',
            comment:'example',
            screenshot:'data:image/png;base64',
        })).rejects.toThrow();
    });

    
    it('should not be able to submit a feedback without comment', async ()=>{
         
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot:'data:image/png;base64',
        })).rejects.toThrow();
    });

    
    it('should not be able to submit a feedback with a invalid screenshot', async ()=>{
         
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'to tonto!',
            screenshot:'test.jpg',
        })).rejects.toThrow();
    });

    
});