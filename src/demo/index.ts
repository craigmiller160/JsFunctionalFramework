/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { SimpleRequest } from '../routing/components/FnRequest';
import { FnResponse } from '../routing/components/FnResponse';
import { Routes } from '../routing/Routes';

const basic = (req: SimpleRequest): FnResponse<any> => {
	return {
		status: 200,
		body: 'Hello World'
	};
};

const promise = (req: SimpleRequest): Promise<FnResponse<any>> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				body: 'Hello World Async'
			});
		}, 2000);
	});

const error = (req: SimpleRequest): FnResponse<any> => {
	throw new Error('Dying');
};

const errorPromise = (req: SimpleRequest): Promise<FnResponse<any>> =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error('Dying Async'));
		}, 2000);
	});

const errorReturned = (req: SimpleRequest): FnResponse<any> => {
	return {
		error: new Error('Returned Dying')
	};
};

export const routes: Routes = [
	{
		uri: '/demo',
		children: [
			{
				uri: '/basic',
				method: 'get',
				handler: basic
			},
			{
				uri: '/promise',
				method: 'get',
				handler: promise
			},
			{
				uri: '/error',
				method: 'get',
				handler: error
			},
			{
				uri: '/errorPromise',
				method: 'get',
				handler: errorPromise
			},
			{
				uri: '/errorReturned',
				method: 'get',
				handler: errorReturned
			}
		]
	}
];
