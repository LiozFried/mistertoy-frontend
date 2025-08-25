import { toyService } from "../../services/toy.service";
import { SET_TOYS, REMOVE_TOY, SET_IS_LOADING, SET_FILTER_BY, UPDATE_TOY, ADD_TOY, SET_TOY_LABELS } from "../reducers/toy.reducer";
import { store } from '../store'

export function loadToys() {
    const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action: Cannot load toys', err)
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action: Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action: Cannot save toy', err)
            throw err
        })
}

export function loadToyLabels() {
    return toyService.getToyLabels()
        .then(labels => {
            store.dispatch({ type: SET_TOY_LABELS, labels })
        })
        .catch(err => {
            console.log('toy action: Cannot get labels', err)
            throw err
        })
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}