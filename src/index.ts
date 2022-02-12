import express from 'express';
import { addRoutes } from './demo';

const app = express();
app.get('/hello', (req, res) => {
	res.send('Hello World');
});
addRoutes(app);

app.listen(8080, () => {
	console.error('Listening on port 8080');
});
