import {
	Publisher,
	Subjects,
	TicketUpdatedEvent,
} from '@aidansworkspace/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
