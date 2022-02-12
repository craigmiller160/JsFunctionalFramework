/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { FnRequest } from '../routing/components/FnRequest';
import { FnResponse } from '../routing/components/FnResponse';
import { FnServer } from '../server/ServerCreator';

const basic = (req: FnRequest<any>): FnResponse<any> => {
	return {
		status: 200,
		body: 'Hello World'
	};
};

const promise = (req: FnRequest<any>): Promise<FnResponse<any>> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				body: 'Hello World Async'
			});
		}, 2000);
	});

const error = (req: FnRequest<any>): FnResponse<any> => {
	throw new Error('Dying');
};

const errorPromise = (req: FnRequest<any>): Promise<FnResponse<any>> =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error('Dying Async'));
		}, 2000);
	});

export const addRoutes = (server: FnServer) => {
	const router = server.route('/demo');
	router.get('/basic', basic);
	router.get('/promise', promise);
	router.get('/error', error);
	router.get('/errorPromise', errorPromise);
};
