/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import { RouteHandler } from '../routing/RouteHandler';
import { translate } from '../routing/RouteTranslator';

// TODO add more HTTP methods
export interface FnRouter {
	readonly get: (uri: string, routeHandler: RouteHandler) => void;
	readonly post: (uri: string, routeHandler: RouteHandler) => void;
	readonly put: (uri: string, routeHandler: RouteHandler) => void;
	readonly delete: (uri: string, routeHandler: RouteHandler) => void;
}

export interface FnServer extends FnRouter {
	readonly route: (baseUri: string) => FnRouter;
	readonly listen: (port: number) => Promise<void>;
}

export const createServer = (
	configureExpress: (app: Express) => void
): FnServer => {
	const app = express();
	configureExpress(app);
	return {
		get: (uri, routeHandler) => app.get(uri, translate(routeHandler)),
		post: (uri, routeHandler) => app.post(uri, translate(routeHandler)),
		put: (uri, routeHandler) => app.put(uri, translate(routeHandler)),
		delete: (uri, routeHandler) => app.delete(uri, translate(routeHandler)),
		route: (baseUri) => ({
			get: (uri, routeHandler) =>
				app.get(`${baseUri}${uri}`, translate(routeHandler)),
			post: (uri, routeHandler) =>
				app.post(`${baseUri}${uri}`, translate(routeHandler)),
			put: (uri, routeHandler) =>
				app.put(`${baseUri}${uri}`, translate(routeHandler)),
			delete: (uri, routeHandler) =>
				app.delete(`${baseUri}${uri}`, translate(routeHandler))
		}),
		listen: (port) => new Promise((resolve) => app.listen(port, resolve))
	};
};
