import express, { Express } from 'express';
import { applyRoutes, Routes } from '../routing/Routes';

export interface FnServerConfig {
	readonly configureExpress?: (app: Express) => void;
	readonly routes: Routes;
}

export interface FnServer {
	readonly listen: (port: number) => Promise<void>;
}

export const createServer = (config: FnServerConfig): FnServer => {
	const app = express();
	config.configureExpress?.(app);
	applyRoutes(app, config.routes);
	return {
		listen: (port) => new Promise((resolve) => app.listen(port, resolve))
	};
};
