import { EventCategory } from './EventCategory.ts';
import { EventStatus } from './EventStatus.ts';
import { TicketType } from './TicketType.ts';
import { EventImage } from './EventImage.ts';

export type Event = {
    id_event: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    organizer: string;
    category: EventCategory;
    status: EventStatus;
    ticket_type: TicketType;
    image: EventImage;
};
