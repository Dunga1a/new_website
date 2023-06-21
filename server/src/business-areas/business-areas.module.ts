import { Module } from '@nestjs/common';
import { BusinessAreasController } from './business-areas.controller';
import { BusinessAreasService } from './business-areas.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAreas } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessAreas])],
  controllers: [BusinessAreasController],
  providers: [
    {
      provide: Services.BUSINESSAREAS,
      useClass: BusinessAreasService,
    },
  ],
})
export class BusinessAreasModule {}
