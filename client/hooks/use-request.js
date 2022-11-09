import axios from 'axios';
import { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';

export const SubmissionError = (err) => {
	return (
		<>
			{err && (
				<div className='rounded-md bg-red-50 p-4'>
					<div className='flex'>
						<div className='flex-shrink-0'>
							<XCircleIcon
								className='h-5 w-5 text-red-400'
								aria-hidden='true'
							/>
						</div>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>
								There were {err.length} error(s) with your submission
							</h3>
							<div className='mt-2 text-sm text-red-700'>
								<ul role='list' className='list-disc space-y-1 pl-5'>
									{/* {err.map((err) => (
										<li key={err.message}>{err.message}</li>
									))} */}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ({ url, method, body }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			const response = await axios[method](url, body);
			return response.data;
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	return { doRequest, errors };
};
