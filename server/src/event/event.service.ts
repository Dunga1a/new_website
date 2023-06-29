import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/utils/typeorm';
import { Repository, Raw } from 'typeorm';
import { CreateEventDetails, EditEventDetails } from 'src/utils/types';
import { IEventService } from './event';

@Injectable()
export class EventService implements IEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createNewEvent(eventDetails: CreateEventDetails): Promise<Event> {
    const newEvent = await this.eventRepository.create(eventDetails);
    const saveEvent = await this.eventRepository.save(newEvent);
    return saveEvent;
  }

  async getAllEvent(queryParams: any) {
    const page = Number(queryParams.page);
    const pageSize = 8;

    const searchKey = String(queryParams.searchKey) || '';
    const dateStart = queryParams.dateStart || '';
    const dateEnd = queryParams.dateEnd || '';
    const query = this.eventRepository
      .createQueryBuilder('event')
      .where({ status: 0 })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('event.id', 'DESC');

    if (searchKey) {
      query.andWhere('event.title LIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }

    if (dateStart) {
      query.andWhere('event.date_start >= :dateStart', {
        dateStart,
      });
    }
    if (dateEnd) {
      query.andWhere('event.date_end <= :dateEnd', {
        dateEnd,
      });
    }

    const queryCount = this.eventRepository
      .createQueryBuilder('event')
      .where({ status: 0 });
    if (searchKey) {
      queryCount.andWhere('event.title LIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }
    if (dateStart) {
      queryCount.andWhere('event.date_start >= :dateStart', {
        dateStart,
      });
    }
    if (dateEnd) {
      queryCount.andWhere('event.date_end <= :dateEnd', {
        dateEnd,
      });
    }

    const eventList = await query.getMany();
    const countEvent = await queryCount.getCount();

    return { eventList, countEvent };
  }

  async getOneEvent(idEvent: number) {
    const eventOne = await this.eventRepository.findOne(idEvent);
    return eventOne;
  }

  async editEvent(editEventDetails: EditEventDetails) {
    const { id, ...values } = editEventDetails;
    const eventDB = await this.eventRepository.findOne(id);

    if (!eventDB)
      throw new HttpException('Không tìm thấy sự kiện', HttpStatus.BAD_REQUEST);
    eventDB.date_start = editEventDetails.date_start;
    eventDB.date_end = editEventDetails.date_end;
    eventDB.time = editEventDetails.time;
    eventDB.title = editEventDetails.title;
    eventDB.address = editEventDetails.address;
    eventDB.leader = editEventDetails.leader;
    eventDB.content = editEventDetails.content;
    eventDB.file_pdf = editEventDetails.file_pdf;
    eventDB.status = editEventDetails.status;

    return this.eventRepository.save(eventDB);
  }

  async deletedEvent(idEvent: number) {
    const deletedEvent = await this.eventRepository.delete(idEvent);
    return deletedEvent;
  }

  async deletedManyEvent(idEvents: number[]) {
    const deletedManyEvent = await this.eventRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...idEvents)', { idEvents })
      .execute();
    return deletedManyEvent;
  }

  async getLastestEvent() {
    return this.eventRepository
      .createQueryBuilder('Event')
      .orderBy('Event.created_at', 'DESC')
      .getOne();
  }
}
