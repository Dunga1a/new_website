import { Repository } from 'typeorm';
import { Reply } from 'src/utils/typeorm';
import { ReplyDto } from './dtos/Rely.dtos';
import { MailService } from 'src/mail/mail.service';
export declare class RelyService {
    private readonly replyRepository;
    private readonly mailService;
    constructor(replyRepository: Repository<Reply>, mailService: MailService);
    createRely(replyDto: ReplyDto): Promise<Reply>;
}
