import { createServer } from './server/Server';
import { routes } from './demo';

const server = createServer({
	routes
});

server
	.listen(8080)
	.then(() => console.error('Listening on port 8080'))
	.catch((ex) => console.error(ex));
