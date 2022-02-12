import { RouteHandler } from '../routing/RouteHandler';
import * as http from 'node:http';

export type Route<Return> = (uri: string, routeHandler: RouteHandler) => Return;

export interface Routes<Return> {
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
	readonly requestListener: http.RequestListener;
	readonly listen: (port: number) => Promise<void>;
}
