const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { log } = require('../services/log.service')
const { externalServiceBaseUrl } = require('../config/config')

router.get('/', async (req, res) => {
	return res.send({
		data: {
			message: "Greetings from Service 2"
		}
	})
})

router.get('/service-1', async (req, res) => {
	try {
		const url = `${externalServiceBaseUrl}/service-1/v1/`;
		log.info(`service-1 url: ${url}`);
    const jsonResponse = await fetchFromApi(url);
    log.info("service-1 - response: " + JSON.stringify(jsonResponse))
    return res.send(jsonResponse)
  }catch(error) {
    log.error(error.stack)
    return res.send({
      message: "Unable to fetch data from service-1"
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
