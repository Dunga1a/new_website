import { Event } from 'src/utils/typeorm';
import { CreateEventDetails, EditEventDetails } from 'src/utils/types';

export interface IEventService {
  createNewEvent(eventDetails: CreateEventDetails): Promise<Event>;
  getAllEvent(queryParams: any);
  getOneEvent(idEvent: number): Promise<Event>;
  editEvent(editEventDetails: EditEventDetails);
  deletedEvent(idEvent: number);
  deletedManyEvent(idEvents: number[]);
  getLastestEvent();
}
