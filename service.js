
const axios = require("axios")
require("dotenv").config()

const useApi = () => {
    return axios.create({
        baseURL: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards`,
        headers: {
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API_KEY,
        }
    })
}

module.exports = useApi