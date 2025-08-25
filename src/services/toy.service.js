// Local Toy Service
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

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

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy => regExp.test(toy.name))
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
        inStock: true,
    }
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randLabels = []

    for (let i = 0; i < 2; i++) {
        const idx = utilService.getRandomIntInclusive(0, labelsCopy.length - 1)
        randLabels.push(labelsCopy.splice(idx, 1)[0])
    }
    return randLabels
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: '',
        labels: [],
        sort: {
            type: '',
            desc: 1,
        },
    }
}

function getToyLabels() {
    return Promise.resolve(labels)
}

function getInStockValue(inStock) {
    if (inStock === '') return ''
    if (inStock === 'true') return true
    if (inStock === 'false') return false
}