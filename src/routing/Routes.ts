import { RouteHandler } from './RouteHandler';
import { Express } from 'express';

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
	readonly children: ReadonlyArray<RouterRoute | Route>;
}

export type Routes = ReadonlyArray<RouterRoute | Route>;

const isRouterRoute = (route: BaseRoute): route is RouterRoute =>
	(route as unknown as any).children !== undefined;
const isRoute = (route: BaseRoute): route is Route =>
	(route as unknown as any).method !== undefined;

export const applyRoutes = (app: Express, routes: Routes) => {
	routes.forEach((route) => {
		if (isRoute(route)) {
			app[route.method](route.uri, route.handler);
		} else if (isRouterRoute(route)) {

		}
	})
}