import { BusinessAreasDetails } from 'src/utils/types';

export interface IBusinessAreasService {
  getStaticBusinessAreas();
  getAllBusinessAreas(queryParams: any);
  createBusinessAreas(createBusinessDetails: BusinessAreasDetails);
  getOneBusinessAreas(id: number);
  editOneBusinessAreas(editBusinessDetails: BusinessAreasDetails);
  updateStatusOnManyBusinessArea(ids: number[]);
}
