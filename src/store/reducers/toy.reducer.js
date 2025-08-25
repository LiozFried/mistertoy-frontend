import { toyService } from '../../services/toy.service'

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_TOY_LABELS = 'SET_TOY_LABELS'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    toyLabels: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
}

export function toyReducer(state = initialState, cmd = {}) {
    let toys
    switch (cmd.type) {
        //Toys:
        case SET_TOYS:
            return { ...state, toys: cmd.toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== cmd.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [cmd.toy, ...state.toys]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            return { ...state, toys }


        case SET_TOY_LABELS:
            return { ...state, toyLabels: cmd.labels }


        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default:
            return state
    }
}