const request = require('request');
const fs = require('fs');
const crypto = require('crypto');
const colors = require('colors');
const config = JSON.parse(fs.readFileSync('config.json', 'UTF8'));

function pull(locale) {
	var url = address('translations.json');
	var time = timestamp();
	request.post(url, {form:{
		timestamp: time,
		security_token: generateToken(url, time),
		master_revision: config.masterRevision,
		tags: config.tags,
		locales: locale
	}}, function(err, res, body){
		if (res.statusCode !== 200) {
			var error = 'Got an error code ' + res.statusCode;
			return console.log(error.red);
		}
		try {
			var data = JSON.parse(body);
		} catch(e) {
			return console.log('Failed to parse json'.red);
		}

		var filename = './translations/' + locale + '.json';
		fs.writeFileSync(filename, JSON.stringify(data[locale], null, 4));
		var message = 'Saved translation ' + locale
		console.log(message.green);

	});
}

function generateToken(address, timestamp) {
	var digest = timestamp + address + config.password
	return crypto.createHash('sha1').update(digest).digest('hex')
}

function address(api) {
	return 'https://wg-content.codeitup.com/webservices/' +
		config.apiKey + '/' + api
}

function timestamp() {
	return Math.floor(Date.now() / 1000);
}

function localeList() {
	var url = address('locales.json');
	var time = timestamp();
	request.post(url, {form:{
		timestamp: time,
		security_token: generateToken(url, time),
		master_revision: config.masterRevision,
		tags: config.tags
	}}, function(err, res, body){
		if (res.statusCode !== 200) {
			var error = 'Got an error code ' + res.statusCode;
			return console.log(error.red);
		}
		try {
			var data = JSON.parse(body);
		} catch(e) {
			return console.log('Failed to parse json'.red);
		}

		var keys = Object.keys(data);
		keys = config['manual-languages'].concat(keys)
		var message = 'Found ' + keys.length + ' locales'
		console.log(message.green)

		keys.forEach(function(key) {
			pull(key);
		});
	});
}

localeList()
