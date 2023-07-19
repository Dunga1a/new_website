import { Member } from 'src/utils/typeorm';
import { CreateMemberDto } from './dtos/member.dto';

export interface IMemberService {
  createMember(memberDetails: CreateMemberDto): Promise<Member>;
  getAllMember();
  getAllMembers(queryParams: any);
  getAllMembersGroupBy();
  getMemberByRole(queryParams: any);
  getOneMember(idMember: number);
  confirmOneMember(userMemberDetail);
  setStatusMember(idMember: number);
  editMember(memberDetailEdit: CreateMemberDto);
  deleteOneMember(idMember: number);
  deleteManyMember(idMembers: number[]);
  checkError(errorDetails: any);
}
