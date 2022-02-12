/* eslint-disable @typescript-eslint/no-explicit-any */
import { FnRequest } from './components/FnRequest';
import { FnResponse } from './components/FnResponse';

export type RouteHandlerResult<ResB> =
	| FnResponse<ResB>
	| Promise<FnResponse<ResB>>;

export type RouteHandler<ReqB = any, Query = any, Params = any, ResB = any> = (
	req: FnRequest<ReqB, Query, Params>
) => RouteHandlerResult<ResB>;

export type SimpleRouteHandler<ResB> = RouteHandler<
	unknown,
	unknown,
	unknown,
	ResB
>;
