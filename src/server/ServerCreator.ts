/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import { RouteHandler } from '../routing/RouteHandler';
import { translate } from '../routing/RouteTranslator';

// TODO add more HTTP methods
// TODO add nested routers
export interface FnServer {
	readonly get: (uri: string, routeHandler: RouteHandler) => void;
	readonly post: (uri: string, routeHandler: RouteHandler) => void;
	readonly put: (uri: string, routeHandler: RouteHandler) => void;
	readonly delete: (uri: string, routeHandler: RouteHandler) => void;
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
		delete: (uri, routeHandler) => app.delete(uri, translate(routeHandler))
	};
};
