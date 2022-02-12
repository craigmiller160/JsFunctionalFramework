import { RouteHandler } from './RouteHandler';
import { Express } from 'express';
import { translate } from './RouteTranslator';

export type Method =
	| 'get'
	| 'post'
	| 'put'
	| 'delete'
	| 'head'
	| 'connect'
	| 'options'
	| 'trace'
	| 'patch';

interface BaseRoute {
	readonly uri: string;
}

export interface Route extends BaseRoute {
	readonly method: Method;
	readonly handler: RouteHandler;
}

export interface RouterRoute extends BaseRoute {
	readonly children: Routes;
}

export type Routes = ReadonlyArray<RouterRoute | Route>;

const isRouterRoute = (route: BaseRoute): route is RouterRoute =>
	(route as unknown as any).children !== undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
const isRoute = (route: BaseRoute): route is Route =>
	(route as unknown as any).method !== undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

export const applyRoutes = (app: Express, routes: Routes, baseUri = '') => {
	routes.forEach((route) => {
		if (isRoute(route)) {
			app[route.method](
				`${baseUri}${route.uri}`,
				translate(route.handler)
			);
		} else if (isRouterRoute(route)) {
			applyRoutes(app, route.children, `${baseUri}${route.uri}`);
		} else {
			throw new Error('Unknown route type');
		}
	});
};
