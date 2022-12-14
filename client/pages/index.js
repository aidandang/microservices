import buildClient from '../api/build-client';

const LandingPage = () => {
	return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get('/api/users/current-user');

	return data;
};

export default LandingPage;
