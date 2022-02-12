/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express';
import { instanceOf, match } from 'ts-pattern';
import { identity } from 'fp-ts';
import * as TaskTry from '@craigmiller160/ts-functions/TaskTry';
import * as TaskEither from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

interface UriInfo {
	readonly path: string;
	readonly query: object; // TODO type this
	readonly params: object; // TODO type this
}

interface Session {}

interface FnRequest<ReqB> {
	readonly uriInfo: UriInfo;
	readonly body: ReqB;
	readonly headers: object; // TODO type this
	readonly cookies: object; // TODO type this
	readonly session?: Session;
}

interface FnResponse<ResB> {
	readonly status: number;
	readonly body?: ResB;
	readonly headers?: object;
	readonly error?: any;
}

type RouteHandlerResult<ResB> = FnResponse<ResB> | Promise<FnResponse<ResB>>;
type RouteHandler<ReqB = any, ResB = any> = (
	req: FnRequest<ReqB>
) => RouteHandlerResult<ResB>;

const routeHandler: RouteHandler = (req) => {};

export const createRoute = (app: Express) => {
	app.get('/concept1/hello', (req, res, next) => {
		const fnRes = routeHandler({
			uriInfo: {
				path: req.path,
				params: req.params,
				query: req.query
			},
			body: req.body,
			headers: req.headers,
			cookies: req.cookies
		});

		const resPromise = match(fnRes)
			.with(instanceOf(Promise), (_) => _ as Promise<FnResponse<any>>)
			.otherwise((_) => Promise.resolve(_ as FnResponse<any>));

		pipe(
			TaskTry.tryCatch(() => resPromise),
			TaskEither.fold(
				(ex) => async () => next(ex),
				(theRes) => async () => {
					if (theRes.error) {
						next(theRes.error);
					} else {
						res.status(theRes.status);
						Object.entries(theRes.headers ?? {}).forEach(
							([key, value]) => res.setHeader(key, value)
						);
						if (theRes.body) {
							res.send(theRes.body); // TODO add more types and stuff
						}
					}
				}
			)
		)();
	});
};
