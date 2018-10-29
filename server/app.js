import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import likePost from './auto-liker';

let app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', async (req, res) => {
	console.log(req.body.postUrl);
	await likePost({ postUrl: req.body.postUrl, username: process.env.USERNAME_TEST, password: process.env.PASSWORD_TEST });
	res.sendFile(path.join(__dirname, './index.html'));
	res.send({ status: 'Success!' })
});

app.listen(3000, () => console.log('Running 🚀 on a http://localhost:3000/'));