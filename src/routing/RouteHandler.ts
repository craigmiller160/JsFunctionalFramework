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

export type BodyRouteHandler<ReqB, ResB> = RouteHandler<
	ReqB,
	unknown,
	unknown,
	ResB
>;

export type QueryRouteHandler<Query, ResB> = RouteHandler<
	unknown,
	Query,
	unknown,
	ResB
>;

export type ParamsRouteHandler<Params, ResB> = RouteHandler<
	unknown,
	unknown,
	Params,
	ResB
>;

export type BodyQueryRouteHandler<ReqB, Query, ResB> = RouteHandler<
	ReqB,
	Query,
	unknown,
	ResB
>;

export type BodyParamsRouteHandler<ReqB, Params, ResB> = RouteHandler<
	ReqB,
	Params,
	unknown,
	ResB
>;

export type QueryParamsRouteHandler<Query, Params, ResB> = RouteHandler<
	unknown,
	Query,
	Params,
	ResB
>;
