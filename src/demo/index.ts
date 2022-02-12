import { SimpleRequest } from '../routing/components/FnRequest';
import { FnResponse } from '../routing/components/FnResponse';
import { Routes } from '../routing/Routes';

const basic = (req: SimpleRequest): FnResponse<string> => {
	return {
		status: 200,
		body: `Hello World: ${req.uriInfo.path}`
	};
};

const promise = (req: SimpleRequest): Promise<FnResponse<string>> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				body: `Hello World Async: ${req.uriInfo.path}`
			});
		}, 2000);
	});

const error = (req: SimpleRequest): FnResponse<string> => {
	throw new Error(`Dying: ${req.uriInfo.path}`);
};

const errorPromise = (req: SimpleRequest): Promise<FnResponse<string>> =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error(`Dying Async: ${req.uriInfo.path}`));
		}, 2000);
	});

const errorReturned = (req: SimpleRequest): FnResponse<string> => {
	return {
		error: new Error(`Returned Dying: ${req.uriInfo.path}`)
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
