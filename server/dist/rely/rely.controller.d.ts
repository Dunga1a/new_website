import { IRelyService } from './rely';
import { ReplyDto } from './dtos/Rely.dtos';
import { Reply } from 'src/utils/typeorm';
export declare class RelyController {
    private readonly relyService;
    constructor(relyService: IRelyService);
    createRely(relyDto: ReplyDto): Promise<Reply>;
}
