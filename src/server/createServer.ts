import express, { Express } from 'express';
import { translate } from '../routing/RouteTranslator';
import { FnServer } from './Server';
import { createRouter } from './createRouter';

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
