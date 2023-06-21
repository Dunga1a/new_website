import { BusinessAreas } from './entities/BusinessAreas';
import { Comment } from './entities/Comment';
import { Contact } from './entities/Contact';
import { Member } from './entities/Members';
import { NewsCategory } from './entities/NewsCategory';
import { NewsPost } from './entities/NewsPost';
import { OrganizeMembershipTitle } from './entities/OrganizeMembershipTitle';
import { Reply } from './entities/Reply';
import { Role } from './entities/Role';
import { User } from './entities/User';
import { Event } from './entities/Event';

const entities = [
  User,
  Role,
  BusinessAreas,
  Comment,
  Contact,
  Event,
  Member,
  NewsCategory,
  NewsPost,
  OrganizeMembershipTitle,
  Reply,
];

export default entities;

export {
  User,
  Role,
  BusinessAreas,
  Comment,
  Contact,
  Event,
  Member,
  NewsCategory,
  NewsPost,
  OrganizeMembershipTitle,
  Reply,
};
