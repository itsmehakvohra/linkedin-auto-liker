const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const likePost = require('./auto-liker');

const port = process.env.PORT || 8000;

let app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	console.log('IS THIS HERE?!?!');
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
	console.log(req.body.postUrl);
	await likePost({ postUrl: req.body.postUrl, username: process.env.USERNAME_TEST, password: process.env.PASSWORD_TEST });
	res.sendFile(path.join(__dirname, 'index.html'));
	res.send({ status: 'Success!' })
});

app.listen(port , () => console.log('Running 🚀 on server' + ' ' + port));