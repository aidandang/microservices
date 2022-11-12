import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import AuthLayout, {
	Text,
	Button,
	SubmissionError,
} from '../../components/auth';

const subtitle = {
	href: '/auth/signin',
	label: 'sign in for your account',
};

export default () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});

	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
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
		<AuthLayout title={'Sign up for a new account'} subtitle={subtitle}>
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

				{errors && <SubmissionError err={errors} />}

				<Button type='submit'>Sign up</Button>
			</form>
		</AuthLayout>
	);
};
