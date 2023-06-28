import { Services } from 'src/utils/constants';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';
import { Role, User } from 'src/utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],

  controllers: [RoleController],
  providers: [
    {
      provide: Services.ROLE,
      useClass: RoleService,
    },
  ],
  exports: [
    {
      provide: Services.ROLE,
      useClass: RoleService,
    },
  ],
})
export class RoleModule {}
