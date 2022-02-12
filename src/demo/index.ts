import { Routes } from '../routing/Routes';
import { SimpleRouteHandler } from '../routing/RouteHandler';

const basic: SimpleRouteHandler<string> = (req) => {
	return {
		status: 200,
		body: `Hello World: ${req.uriInfo.path}`
	};
};

const promise: SimpleRouteHandler<string> = (req) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				body: `Hello World Async: ${req.uriInfo.path}`
			});
		}, 2000);
	});

const error: SimpleRouteHandler<string> = (req) => {
	throw new Error(`Dying: ${req.uriInfo.path}`);
};

const errorPromise: SimpleRouteHandler<string> = (req) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error(`Dying Async: ${req.uriInfo.path}`));
		}, 2000);
	});

const errorReturned: SimpleRouteHandler<string> = (req) => {
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
