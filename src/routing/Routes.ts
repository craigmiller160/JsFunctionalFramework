import { RouteHandler } from './RouteHandler';

export type Method =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'HEAD'
	| 'CONNECT'
	| 'OPTIONS'
	| 'TRACE'
	| 'PATCH';

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
