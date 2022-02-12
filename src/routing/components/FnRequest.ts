import { UriInfo } from './UriInfo';
import { Session } from './Session';
import { FnHeaders } from './FnHeaders';

export interface FnRequest<Body, Query, Params> {
	readonly uriInfo: UriInfo<Query, Params>;
	readonly body: Body;
	readonly headers: FnHeaders;
	readonly cookies: object; // TODO type this
	readonly session?: Session;
}
