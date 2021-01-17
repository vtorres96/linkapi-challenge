const axios = require("axios");

const blingApiKey = '6ba5dbf6e043fc943d41cbca4a1865d97a134ebe672ff7d70bc9a3e82d5786aa3e27a7cf';
const pipeDriveApiToken = '40ac7773d1da47d5529907fc5544c85b9e4c3b6b';

const apiBling = axios.create({
  baseURL: 'https://bling.com.br/Api/v2',
  timeout: 10000
});

const apiPipeDrive = axios.create({
  baseURL: 'https://api.pipedrive.com/v1',
  timeout: 10000
});

module.exports = { 
  blingApiKey,
  pipeDriveApiToken,
  apiBling,
  apiPipeDrive
};