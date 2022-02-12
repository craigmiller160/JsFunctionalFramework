import express from 'express';

const app = express();
app.get('/hello', (req, res) => {
	res.send('Hello World');
});

app.listen(8080, () => {
	console.error('Listening on port 8080');
});
