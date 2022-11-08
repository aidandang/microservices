import { useState } from 'react';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<h1 className='text-2xl font-semibold'>Sign Up</h1>
			<form>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<div className='mt-1'>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => {
								e.preventDefault();
								setEmail(e.target.value);
							}}
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<div className='mt-1'>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								e.preventDefault();
								setPassword(e.target.value);
							}}
							className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
						/>
					</div>
				</div>
				<div>
					<button
						type='button'
						className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
};
