// Local Toy Service
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

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