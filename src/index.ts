import express from 'express';
import { createConcept1 } from './concept1';

const app = express();
app.get('/hello', (req, res) => {
	res.send('Hello World');
});
createConcept1(app);

app.listen(8080, () => {
	console.error('Listening on port 8080');
});
