import { addRoutes } from './demo';
import { createServer } from './server/ServerCreator';

const server = createServer();
addRoutes(server);

server
	.listen(8080)
	.then(() => console.error('Listening on port 8080'))
	.catch((ex) => console.error(ex));
