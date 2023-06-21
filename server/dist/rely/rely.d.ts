import { ReplyDto } from './dtos/Rely.dtos';
export interface IRelyService {
    createRely(relyParams: ReplyDto): any;
    deleteRely(relyParams: ReplyDto): any;
}
