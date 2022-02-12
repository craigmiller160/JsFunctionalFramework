export interface FnResponse<ResB> {
	readonly status?: number;
	readonly body?: ResB;
	readonly headers?: object;
	readonly error?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
