const express = require("express")
const useApi = require("./service")
const helpers = require("./helpers")
const file = require("fs")
const expansionData = require("./data.json")

const server = express()


const getData = async () => {
    try {
        const { data } = await useApi().get()
        const array = helpers.convertToArray(data)
        const filteredArray = helpers.filterByExpansion(array)
        const filteredTwiceArray = helpers.filterByCard(filteredArray)
        file.writeFile("./data.json", JSON.stringify(filteredTwiceArray), err => {
            console.log(err)
        })

    } catch(err) {
        console.log(err)
    }
}

getData()

setInterval(getData, 1000 * 60 * 60 * 24)

server.get("/", (req, res) => {
    res.status(200).json(expansionData)
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log("it lives"))