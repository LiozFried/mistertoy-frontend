import { toyService } from '../../services/toy.service'

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
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


        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading}
            
        default:
            return state
    }
}