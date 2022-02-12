/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import { RouteHandler } from '../routing/RouteHandler';
import { translate } from '../routing/RouteTranslator';

export type Route<Return> = (uri: string, routeHandler: RouteHandler) => Return;

// TODO add more HTTP methods
export interface FnRouter {
	readonly get: Route<FnRouter>;
	readonly post: Route<FnRouter>;
	readonly put: Route<FnRouter>;
	readonly delete: Route<FnRouter>;
	readonly done: () => FnServer;
}

export interface FnServer {
	readonly get: Route<FnServer>;
	readonly post: Route<FnServer>;
	readonly put: Route<FnServer>;
	readonly delete: Route<FnServer>;
	readonly route: (baseUri: string) => FnRouter;
	readonly listen: (port: number) => Promise<void>;
}

const createRouter = (
	server: FnServer,
	app: Express,
	baseUri: string
): FnRouter => ({
	get(uri, routeHandler) {
		app.get(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	post(uri, routeHandler) {
		app.post(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	put(uri, routeHandler) {
		app.put(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	delete(uri, routeHandler) {
		app.delete(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	done() {
		return server;
	}
});

export const createServer = (
	configureExpress?: (app: Express) => void
): FnServer => {
	const app = express();
	configureExpress?.(app);
	return {
		get(uri, routeHandler) {
			app.get(uri, translate(routeHandler));
			return this;
		},
		post(uri, routeHandler) {
			app.post(uri, translate(routeHandler));
			return this;
		},
		put(uri, routeHandler) {
			app.put(uri, translate(routeHandler));
			return this;
		},
		delete(uri, routeHandler) {
			app.delete(uri, translate(routeHandler));
			return this;
		},
		route(baseUri) {
			return createRouter(this, app, baseUri);
		},
		listen: (port) => new Promise((resolve) => app.listen(port, resolve))
	};
};
