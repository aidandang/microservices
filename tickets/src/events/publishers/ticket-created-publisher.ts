import {
	Publisher,
	Subjects,
	TicketCreatedEvent,
} from '@aidansworkspace/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
