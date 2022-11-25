import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
	NotFoundError,
	requireAuth,
	validateRequest,
} from '@aidansworkspace/common';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { Order } from '../models/orders';

const router = express.Router();

router.post(
	'/api/orders',
	requireAuth,
	[
		body('ticketId')
			.not()
			.isEmpty()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage('TicketId must be provide'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { ticketId } = req.body;

		const ticket = await Ticket.findById(ticketId);

		if (!ticket) {
			throw new NotFoundError();
		}

		res.send({ message: 'hello' });
	}
);

export { router as createOrderRouter };
