import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => {
	console.log(req.body.postUrl);
	res.sendFile(path.join(__dirname, './index.html'));
	res.send({status: 'Success!'})
});

app.listen(3000, () => console.log('Running 🚀 on a http://localhost:3000/'));