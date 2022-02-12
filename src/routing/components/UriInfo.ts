export interface UriInfo<Query, Params> {
	readonly path: string;
	readonly query: Query;
	readonly params: Params;
}
