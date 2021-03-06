import { UriInfo } from './UriInfo';
import { Session } from './Session';

export interface FnRequest<ReqB> {
	readonly uriInfo: UriInfo;
	readonly body: ReqB;
	readonly headers: object; // TODO type this
	readonly cookies: object; // TODO type this
	readonly session?: Session;
}
