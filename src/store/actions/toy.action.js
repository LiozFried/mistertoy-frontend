import { toyService } from "../../services/toy.service";
import { SET_TOYS, REMOVE_TOY, SET_IS_LOADING, SET_FILTER_BY } from "../reducers/toy.reducer";
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
                store.dispatch({ type: SET_IS_LOADING, isLoading: false})
            }, 350)
        })
}