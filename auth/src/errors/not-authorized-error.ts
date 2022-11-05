import { CustomError } from './custom-error';

const NOT_AUTHORIZED = 'Not Authorized';

export class NotAuthorizedError extends CustomError {
	statusCode = 401;

	constructor() {
		super(NOT_AUTHORIZED);

		// Only because we are extending a built in class
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors() {
		return [{ message: NOT_AUTHORIZED }];
	}
}
