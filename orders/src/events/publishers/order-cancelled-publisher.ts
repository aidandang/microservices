import {
	Publisher,
	OrderCancelledEvent,
	Subjects,
} from '@aidansworkspace/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
