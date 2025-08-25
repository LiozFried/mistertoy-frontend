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

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
    getInStockValue
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToDisplay = toys

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
            }

            if (typeof filterBy.inStock === 'boolean') {
                toysToDisplay = toysToDisplay.filter(toy => toy.inStock === filterBy.inStock)
            }

            if (filterBy.labels?.length) {
                toysToDisplay = toysToDisplay.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            if (filterBy.sort.type) {
                const dir = +filterBy.sort.desc
                toysToDisplay.sort((a, b) => {
                    if (filterBy.sort.type === 'name') {
                        return a.name.localeCompare(b.name) * dir
                    } else if (filterBy.sort.type === 'price' || filterBy.sort.type === 'createdAt') {
                        return (a[filterBy.sort.type] - b[filterBy.sort.type]) * dir
                    }
                })
            }

            return toysToDisplay
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
        toy.createdAt = Date.now()
        toy.inStock = true
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

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)

    if (!toys || !toys.length) {
        toys = [
            {
                "_id": "t101",
                "name": "Remote Control Car",
                "imgUrl": "https://images.pexels.com/photos/29082154/pexels-photo-29082154.jpeg",
                "price": 45,
                "labels": ["On wheels", "Battery Powered"],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Chess Set",
                "imgUrl": "https://images.pexels.com/photos/6598772/pexels-photo-6598772.jpeg",
                "price": 25,
                "labels": ["Box game", "Art"],
                "createdAt": 1642145678900,
                "inStock": true
            },
            {
                "_id": "t103",
                "name": "Baby Mobile",
                "imgUrl": "https://images.pexels.com/photos/11369154/pexels-photo-11369154.jpeg",
                "price": 30,
                "labels": ["Baby", "Art"],
                "createdAt": 1653259876543,
                "inStock": true
            },
            {
                "_id": "t104",
                "name": "Building Blocks",
                "imgUrl": "https://images.pexels.com/photos/1148496/pexels-photo-1148496.jpeg",
                "price": 20,
                "labels": ["Puzzle", "Outdoor"],
                "createdAt": 1664374567890,
                "inStock": false
            },
            {
                "_id": "t105",
                "name": "Toy Robot",
                "imgUrl": "https://images.pexels.com/photos/8294651/pexels-photo-8294651.jpeg",
                "price": 75,
                "labels": ["Battery Powered", "On wheels"],
                "createdAt": 1675489876543,
                "inStock": true
            },
            {
                "_id": "t106",
                "name": "Wooden Dollhouse",
                "imgUrl": "https://images.pexels.com/photos/191360/pexels-photo-191360.jpeg",
                "price": 90,
                "labels": ["Doll", "Art"],
                "createdAt": 1686604567890,
                "inStock": false
            },
            {
                "_id": "t107",
                "name": "Jigsaw Puzzle",
                "imgUrl": "https://images.pexels.com/photos/3482442/pexels-photo-3482442.jpeg",
                "price": 15,
                "labels": ["Puzzle", "Box game"],
                "createdAt": 1697718901234,
                "inStock": true
            },
            {
                "_id": "t108",
                "name": "Tricycle",
                "imgUrl": "https://images.pexels.com/photos/1230751/pexels-photo-1230751.jpeg",
                "price": 55,
                "labels": ["Outdoor", "On wheels", "Baby"],
                "createdAt": 1708834567890,
                "inStock": true
            },
            {
                "_id": "t109",
                "name": "Action Figure",
                "imgUrl": "https://images.pexels.com/photos/7829101/pexels-photo-7829101.jpeg",
                "price": 28,
                "labels": ["Doll", "Art"],
                "createdAt": 1719949876543,
                "inStock": false
            },
            {
                "_id": "t110",
                "name": "Electronic Drum Set",
                "imgUrl": "https://images.pexels.com/photos/258668/pexels-photo-258668.jpeg",
                "price": 110,
                "labels": ["Battery Powered", "Art"],
                "createdAt": 1731064567890,
                "inStock": true
            }
        ]

        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}