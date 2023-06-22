import { Module } from '@nestjs/common';
import { OrganizeMembershipTitleService } from './organize-membership-title.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizeMembershipTitle } from 'src/utils/typeorm';
import { OrganizeMembershipTitleController } from './organize-membership-title.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizeMembershipTitle])],
  controllers: [OrganizeMembershipTitleController],
  providers: [
    {
      provide: Services.ORGANIZE,
      useClass: OrganizeMembershipTitleService,
    },
  ],
})
export class OrganizeMembershipTitleModule {}
