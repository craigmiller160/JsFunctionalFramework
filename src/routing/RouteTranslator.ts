import { RouteHandler } from './RouteHandler';
import { NextFunction, Request, Response } from 'express';
import { identity, pipe } from 'fp-ts/function';
import * as Try from '@craigmiller160/ts-functions/Try';
import * as Either from 'fp-ts/Either';
import { instanceOf, match } from 'ts-pattern';
import * as TaskTry from '@craigmiller160/ts-functions/TaskTry';
import * as TaskEither from 'fp-ts/TaskEither';
import { FnResponse } from './components/FnResponse';

export const translate =
	(fnRoute: RouteHandler) =>
	(req: Request, res: Response, next: NextFunction) => {
		const fnRes = pipe(
			Try.tryCatch(() =>
				fnRoute({
					uriInfo: {
						path: req.path,
						params: req.params,
						query: req.query
					},
					body: req.body,
					headers: req.headers,
					cookies: req.cookies
				})
			),
			Either.fold(
				(ex): FnResponse<any> => ({
					error: ex
				}),
				identity
			)
		);

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
						res.status(theRes.status ?? 500);
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
	};
