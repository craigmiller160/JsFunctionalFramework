import express, { Express } from 'express';
import { applyRoutes, Routes } from '../routing/Routes';

export interface FnServerConfig {
	readonly configureExpress?: (app: Express) => void;
	readonly routes: Routes;
	readonly port: number;
}

export type StartServer = () => Promise<void>;

export const createServer = (config: FnServerConfig): StartServer => {
	const app = express();
	config.configureExpress?.(app);
	applyRoutes(app, config.routes);
	return () => new Promise((resolve) => app.listen(config.port, resolve));
};
