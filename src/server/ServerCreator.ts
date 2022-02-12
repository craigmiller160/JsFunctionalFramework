/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import { RouteHandler } from '../routing/RouteHandler';
import { translate } from '../routing/RouteTranslator';

export type Route<Return> = (uri: string, routeHandler: RouteHandler) => Return;

interface Routes<Return> {
	readonly get: Route<Return>;
	readonly post: Route<Return>;
	readonly put: Route<Return>;
	readonly delete: Route<Return>;
	readonly head: Route<Return>;
	readonly connect: Route<Return>;
	readonly options: Route<Return>;
	readonly trace: Route<Return>;
	readonly patch: Route<Return>;
}

export interface FnRouter extends Routes<FnRouter> {
	readonly done: () => FnServer;
}

export interface FnServer extends Routes<FnServer> {
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
	head(uri, routeHandler) {
		app.head(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	connect(uri, routeHandler) {
		app.connect(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	options(uri, routeHandler) {
		app.options(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	trace(uri, routeHandler) {
		app.trace(`${baseUri}${uri}`, translate(routeHandler));
		return this;
	},
	patch(uri, routeHandler) {
		app.patch(`${baseUri}${uri}`, translate(routeHandler));
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
		head(uri, routeHandler) {
			app.head(uri, translate(routeHandler));
			return this;
		},
		connect(uri, routeHandler) {
			app.connect(uri, translate(routeHandler));
			return this;
		},
		options(uri, routeHandler) {
			app.options(uri, translate(routeHandler));
			return this;
		},
		trace(uri, routeHandler) {
			app.trace(uri, translate(routeHandler));
			return this;
		},
		patch(uri, routeHandler) {
			app.patch(uri, translate(routeHandler));
			return this;
		},
		route(baseUri) {
			return createRouter(this, app, baseUri);
		},
		listen: (port) => new Promise((resolve) => app.listen(port, resolve))
	};
};
