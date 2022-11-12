import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import AuthLayout, {
	Text,
	Button,
	SubmissionError,
} from '../../components/auth';

const subtitle = {
	href: '/auth/signup',
	label: 'sign up for a new account',
};

export default () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});

	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: {
			email: formState.email,
			password: formState.password,
		},
		onSuccess: () => Router.push('/'),
	});

	const onChange = (e) => {
		e.preventDefault();

		setFormState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		await doRequest();
	};

	return (
		<AuthLayout title={'Sign in to your account'} subtitle={subtitle}>
			<form className='space-y-6' onSubmit={onSubmit}>
				<Text
					label='Email address'
					name='email'
					type='email'
					autoComplete='new-password'
					required={true}
					onChange={onChange}
				/>
				<Text
					label='Password'
					name='password'
					type='password'
					autoComplete='new-password'
					required={true}
					onChange={onChange}
				/>

				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<input
							id='remember-me'
							name='remember-me'
							type='checkbox'
							className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
						/>
						<label
							htmlFor='remember-me'
							className='ml-2 block text-sm text-gray-900'
						>
							Remember me
						</label>
					</div>

					<div className='text-sm'>
						<a
							href='#'
							className='font-medium text-indigo-600 hover:text-indigo-500'
						>
							Forgot your password?
						</a>
					</div>
				</div>

				{errors && <SubmissionError err={errors} />}

				<Button type='submit'>Sign in</Button>
			</form>
		</AuthLayout>
	);
};
