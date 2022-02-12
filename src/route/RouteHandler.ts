/* eslint-disable @typescript-eslint/no-explicit-any */
import { FnRequest } from './FnRequest';
import { FnResponse } from './FnResponse';

export type RouteHandlerResult<ResB> =
	| FnResponse<ResB>
	| Promise<FnResponse<ResB>>;
export type RouteHandler<ReqB = any, ResB = any> = (
	req: FnRequest<ReqB>
) => RouteHandlerResult<ResB>;
