import { Express } from 'express';

interface UriInfo {
	readonly path: string;
	readonly query: object; // TODO type this
	readonly params: object; // TODO type this
}

interface FnRequest {
	readonly uriInfo: UriInfo;
}

interface FnResponse {
	// TODO what to do here
}

type RouteHandlerResult = FnResponse | Promise<FnResponse>;
type RouteHandler = (req: FnRequest) => RouteHandlerResult;

const routeHandler: RouteHandler = (req) => {};
