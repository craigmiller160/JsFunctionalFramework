import { FnRouter, FnServer } from './Server';
import { Express } from 'express';
import { translate } from '../routing/RouteTranslator';

export const createRouter = (
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
