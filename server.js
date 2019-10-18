const express = require("express");
const cors = require("cors")
const ApiList = require("./src/ApiList")

const PORT = process.env.PORT || 9000; // port where the server are online
const app = express();

app.disable('x-powered-by'); // removing the express header

const corsConfig = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsConfig))

function sortByKeyName(json){
  let sorted = {}
  Object.keys(json).sort().forEach( key => sorted[key] = json[key])
  return sorted
}

app.get( "/api" || "/api/", (req, res) => {
  res.set('Link', '<http://ggt-des.ibge.gov.br/api/>; rel="https://schema.org/EntryPoint" ');
	return res.send(sortByKeyName(ApiList));
});

app.listen(PORT, () =>
  console.log(`GGT entrypoint Api are running on port ${PORT}!`),
);