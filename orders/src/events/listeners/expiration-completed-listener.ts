import {
	ExpirationCompletedEvent,
	Listener,
	Subjects,
	OrderStatus,
} from '@aidansworkspace/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
	readonly subject = Subjects.ExpirationCompleted;
	queueGroupName = queueGroupName;

	async onMessage(data: ExpirationCompletedEvent['data'], msg: Message) {
		const order = await Order.findById(data.orderId).populate('ticket');

		if (!order) {
			throw new Error('Order not found');
		}

		order.set({
			status: OrderStatus.Cancelled,
		});
		await order.save();

		await new OrderCancelledPublisher(this.client).publish({
			id: order.id,
			version: order.version,
			ticket: {
				id: order.ticket.id,
			},
		});

		msg.ack();
	}
}
