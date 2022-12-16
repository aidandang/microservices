import axios from 'axios';

export default ({ req }) => {
	if (typeof window === 'undefined') {
		// we are on the sever
		return axios.create({
			baseURL: 'http://www.g7shipping.com',
			headers: req.headers,
		});
	} else {
		// we must be on the browser
		return axios.create({
			baseURL: '/',
		});
	}
};

// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
