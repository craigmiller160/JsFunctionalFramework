import { UriInfo } from './UriInfo';
import { Session } from './Session';
import http from 'http';

export interface FnRequest<Body, Query, Params> {
	readonly uriInfo: UriInfo<Query, Params>;
	readonly body: Body;
	readonly headers: http.IncomingHttpHeaders;
	readonly cookies: object; // TODO type this
	readonly session?: Session;
}
