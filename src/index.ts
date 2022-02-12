import { createServer } from './server/Server';
import { routes } from './demo';

const startServer = createServer({
	routes,
	port: 8080
});

startServer()
	.then(() => console.error('Listening on port 8080'))
	.catch((ex) => console.error(ex));
