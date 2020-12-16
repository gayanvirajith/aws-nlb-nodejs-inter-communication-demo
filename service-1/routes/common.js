const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { log } = require('../services/log.service')
const { externalServiceBaseUrl } = require('../config/config')

router.get('/', async (req, res) => {
	return res.send({
		data: {
			message: "Greetings from Service 1"
		}
	})
})

router.get('/service-2', async (req, res) => {
	const url = `${externalServiceBaseUrl}/service-2/v1/`;
	try {
		const jsonResponse = await fetchFromApi(url);
		log.info("service-2 - response: " + JSON.stringify(jsonResponse))
  	return res.send(jsonResponse)
	}catch(error) {
		log.error(error.stack)
		return res.send({
			message: "unable to fetch data"
		}, 400)
	}
})

const fetchFromApi = (url) => {
		return new Promise((resolve, reject) => {
				fetch(`${url}`)
    			.then(res => res.json())
    			.then((json) => {
						return resolve(json)
					}).catch((err) => {
						return reject(err);
					});
    })
}

module.exports = router;
