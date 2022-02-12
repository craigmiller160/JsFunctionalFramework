import http from 'http';

export const getHeaders = (
	headers: http.IncomingHttpHeaders,
	key: string
): ReadonlyArray<string> => {
	const result = headers[key] ?? [];
	if (result instanceof Array) {
		return result;
	}
	return [result];
};

export const getFirstHeader = (
	headers: http.IncomingHttpHeaders,
	key: string
): string | undefined => {
	const result = headers[key];
	if (!result) {
		return undefined;
	}

	if (result instanceof Array) {
		return result[0];
	}

	return result;
};
