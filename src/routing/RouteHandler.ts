/* eslint-disable @typescript-eslint/no-explicit-any */
import { FnRequest } from './components/FnRequest';
import { FnResponse } from './components/FnResponse';

export type RouteHandlerResult<ResB> =
	| FnResponse<ResB>
	| Promise<FnResponse<ResB>>;
export type RouteHandler<ReqB = any, ResB = any> = (
	req: FnRequest<ReqB>
) => RouteHandlerResult<ResB>;
