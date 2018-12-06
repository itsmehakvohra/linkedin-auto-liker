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
	console.log('form is loaded');
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {

	const postUrl = req.body.postUrl;
	const industry = req.body.industry;
	console.log("Post Url Entered: " + req.body.postUrl);

	const credentials = JSON.parse(process.env.CREDENTIALS);
	const credentialsByIndustry = credentials.filter(function (item) {
		if (item.industry === industry || item.industry === 'admin') {
			return true;
		} else {
			return false;
		}
	});
	console.log(credentials);
	console.log(credentialsByIndustry);
	credentialsByIndustry.forEach(function (item) {
		// Credentials Array
		likePost({ postUrl, username: item.username, password: item.password });
		console.log(item.username + " logged in")
	});

	res.send({ status: 'Success!' });
});

app.listen(port, () => console.log('Running 🚀 on server' + ' ' + port));