import { httpService } from './http.service'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
    getInStockValue,
    getToyLabelsAveragePrice,
    getToyLabelsInventory,
    addMsg,
    removeMsg,
    getLabelCounts,
}

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

async function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

async function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

async function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

async function save(toy) {
    const BASE_URL = toy._id ? `toy/${toy._id}` : 'toy/'
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

async function addMsg(toyId, msg) {
    return httpService.post(BASE_URL + `${toyId}/msg`, msg)
}

async function removeMsg(toyId, msgId) {
    return httpService.delete(BASE_URL + `${toyId}/msg/${msgId}`)
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
        sortBy: { type: '', sortDir: 1 },
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
    }
}

function getToyLabels() {
    return [...labels]
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

async function getLabelCounts() {
    try {
        const { toys } = await query()
        const labelCounts = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (labelCounts[label]) {
                    labelCounts[label]++
                } else {
                    labelCounts[label] = 1
                }
            })
        })
        const labelCountArray = Object.entries(labelCounts).map(
            ([label, count]) => ({
                label,
                count,
            })
        )
        return labelCountArray
    } catch (error) {
        console.log('Could not get label count', error)
    }
}

function getInStockValue(inStock) {
    if (inStock === '') return ''
    if (inStock === 'true') return true
    if (inStock === 'false') return false
}

async function getToyLabelsAveragePrice() {
    try {
        const toys = await query()
        const labelPrices = {}
        const labels = getToyLabels()

        labels.forEach(label => {
            labelPrices[label] = { total: 0, count: 0 }
        })

        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (labelPrices[label]) {
                    labelPrices[label].total += toy.price
                    labelPrices[label].count++
                }
            })
        })

        const averagePrices = []
        for (const label in labelPrices) {
            const { total, count } = labelPrices[label]
            const averagePrice = count > 0 ? (total / count).toFixed(2) : 0
            averagePrices.push({
                label: label,
                averagePrice: +averagePrice
            })
        }
        return averagePrices

    } catch (err) {
        console.error('Could not get toy labels average price:', err)
        throw err
    }
}

async function getToyLabelsInventory() {
    try {
        const toys = await query()
        const inventoryData = {}
        const labels = getToyLabels()

        labels.forEach(label => {
            inventoryData[label] = 0
        })

        toys.forEach(toy => {
            if (toy.inStock) {
                toy.labels.forEach(label => {
                    if (inventoryData.hasOwnProperty(label)) {
                        inventoryData[label]++
                    }
                })
            }
        })

        return Object.keys(inventoryData).map(label => ({
            label,
            inventory: inventoryData[label]
        }))

    } catch (err) {
        console.error('Could not get toy labels inventory:', err)
        throw err
    }
}