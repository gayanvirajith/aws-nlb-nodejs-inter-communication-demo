const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const commonRoutes = require('./routes/common')
const { applicationPort } = require('./config/config')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json()) // for parsing application/json

const corsOptions = {
    exposedHeaders: 'Authorization'
};

// CORS
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    return res.send({
			"message": "Welcome to service 1"
		})
})

app.use('/service-1/v1', commonRoutes);

app.listen(applicationPort, () => {
    console.log(`App listening at http://localhost:${applicationPort}`)
})
