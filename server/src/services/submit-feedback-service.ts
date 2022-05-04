
import { FeedbacksRepository } from './../repositories/feedbacks-repository';



interface SubmitFeedbackRequest{
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackService{

    constructor(
        private feedbacksRepository: FeedbacksRepository
    ){}

    async execute(req: SubmitFeedbackRequest){ 
        const { type, comment, screenshot} = req;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        }
            
        )
     }
}