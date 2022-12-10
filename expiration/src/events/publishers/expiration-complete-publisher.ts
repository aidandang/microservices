import {
	Publisher,
	ExpirationCompletedEvent,
	Subjects,
} from '@aidansworkspace/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
	readonly subject = Subjects.ExpirationCompleted;
}
