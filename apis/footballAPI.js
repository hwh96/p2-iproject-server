const axios = require("axios")


const footballAxios = axios.create({
    baseURL: 'https://v3.football.api-sports.io/'
})


module.exports = footballAxios;


