
const convertToArray = data => 
    Object.keys(data).map(expansionName => ({
        name: expansionName,
        cards: data[expansionName],
    }))

const filterByExpansion = data => {
    const expansionMinimum = 50
    const invalidExpansions = [
        "Hero Skins",
        "Credits",
        "Tavern Brawl",
        "Battlegrounds",
    ]

    return data.filter(expansion => {
        if (expansion.cards.length < expansionMinimum) return false
        if (invalidExpansions.includes(expansion.name)) return false
        return true
    })
}

const filterByCard = data => {
    const invalidCardTypes = [
        "Hero Power", 
        "Hero", 
        "Enchantment"
    ]
    const invalidCardNames = [
        "FX", 
        "Cost", 
        "NOOOOOOOOOOOO", 
        "AFK", 
        "Coin's Vengeance", 
        "Anomaly"
    ]

    return data.map(({ name, cards }) => ({
        name,
        cards: cards.filter((card, index) => {
            const { name, type, flavor } = card
            if (invalidCardNames.includes(name)) return false
            if (invalidCardTypes.includes(type)) return false
            if (!flavor) return false
            if (cards[index + 1]) {
                const nextCard = cards[index + 1]
                if (nextCard.name === name) return false
            }
            return true
        })
    }))
}
module.exports = {
    convertToArray,
    filterByCard,
    filterByExpansion
}