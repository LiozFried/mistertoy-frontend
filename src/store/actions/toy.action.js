import { toyService } from "../../services/toy.service"
import { SET_TOYS, REMOVE_TOY, SET_IS_LOADING, SET_FILTER_BY, UPDATE_TOY, ADD_TOY, SET_TOY_LABELS, SET_MAX_PAGE } from "../reducers/toy.reducer"
import { store } from '../store'

export async function loadToys() {
    const { filterBy } = store.getState().toyModule

    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const { toys, maxPage } = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        store.dispatch({ type: SET_MAX_PAGE, maxPage })
    } catch (err) {
        console.log('toy action: Cannot load toys')
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 350)
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action: Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    try {
        const type = toy._id ? UPDATE_TOY : ADD_TOY
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action: Cannot save toy', err)
        throw err
    }
}

// Old saveToy function
// export function saveToy(toy) {
//     const type = toy._id ? UPDATE_TOY : ADD_TOY

//     return toyService.save(toy)
//         .then(toyToSave => {
//             store.dispatch({ type, toy: toyToSave })
//             return toyToSave
//         })
//         .catch(err => {
//             console.log('toy action: Cannot save toy', err)
//             throw err
//         })
// }

export async function loadToyLabels() {
    try {
        const labels = await toyService.getToyLabels()
        store.dispatch({ type: SET_TOY_LABELS, labels })
        return labels
    } catch (err) {
        console.log('toy action: Cannot get labels', err)
        throw err
    }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}