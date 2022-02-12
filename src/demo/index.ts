/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { Express } from 'express';
import { FnRequest } from '../routing/components/FnRequest';
import { FnResponse } from '../routing/components/FnResponse';
import { translate } from '../routing/RouteTranslator';

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

export const addRoutes = (app: Express) => {
	app.get('/demo/basic', translate(basic));
	app.get('/demo/promise', translate(promise));
	app.get('/demo/error', translate(error));
	app.get('demo/errorPromise', translate(errorPromise));
};
