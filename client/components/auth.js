import { XCircleIcon } from '@heroicons/react/20/solid';

export default function AuthLayout({ title, subtitle, children }) {
	return (
		<div className='flex min-h-full h-screen flex-col py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
					{title}
				</h2>
				{subtitle && (
					<p className='mt-2 text-center text-sm text-gray-600'>
						Or{' '}
						<a
							href={subtitle.href}
							className='font-medium text-indigo-600 hover:text-indigo-500'
						>
							{subtitle.label}
						</a>
					</p>
				)}
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{children}
				</div>
			</div>
		</div>
	);
}

export const Text = ({ label, name, ...props }) => {
	return (
		<div>
			<label htmlFor={name} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<div className='mt-1'>
				<input
					name={name}
					{...props}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
				/>
			</div>
		</div>
	);
};

export const Button = ({ children, ...props }) => {
	return (
		<div>
			<button
				{...props}
				className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
			>
				{children}
			</button>
		</div>
	);
};

export const SubmissionError = ({ err }) => {
	return (
		<div className='rounded-md bg-red-50 p-4'>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
				</div>
				<div className='ml-3'>
					<h3 className='text-sm font-medium text-red-800'>
						There were {err.length} error(s) with your submission
					</h3>
					<div className='mt-2 text-sm text-red-700'>
						<ul role='list' className='list-disc space-y-1 pl-5'>
							{err.map((err) => (
								<li key={err.message}>{err.message}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
