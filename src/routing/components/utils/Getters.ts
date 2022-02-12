import { FnHeaders } from '../FnHeaders';

// TODO do I really want these both separate?
//  If so, probably shouldn't curry them? Or should I?

export const getHeaders =
	(headers: FnHeaders) =>
	(key: string): ReadonlyArray<string> =>
		headers[key] ?? [];

export const getHeader =
	(headers: FnHeaders) =>
	(key: string): string | undefined =>
		headers[key]?.[0];
