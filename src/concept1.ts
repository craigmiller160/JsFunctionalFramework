/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express';
import { instanceOf, match } from 'ts-pattern';
import * as TaskTry from '@craigmiller160/ts-functions/TaskTry';
import * as TaskEither from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import * as Try from '@craigmiller160/ts-functions/Try';
import * as Either from 'fp-ts/Either';
import { identity } from 'fp-ts/function';

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
	readonly status?: number;
	readonly body?: ResB;
	readonly headers?: object;
	readonly error?: any;
}

type RouteHandlerResult<ResB> = FnResponse<ResB> | Promise<FnResponse<ResB>>;
type RouteHandler<ReqB = any, ResB = any> = (
	req: FnRequest<ReqB>
) => RouteHandlerResult<ResB>;

const routeHandler: RouteHandler = (req) => {
	if (true) {
		throw new Error('Dying');
	}

	return {
		status: 200,
		body: 'Hello World',
		headers: {
			abc: 'def'
		}
	};
};

export const createConcept1 = (app: Express) => {
	app.get('/concept1/hello', (req, res, next) => {

	});
};
