export const SET_TOYS = 'SET_TOYS'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //Toys:
        case SET_TOYS:
            return { ...state, toys: cmd.toys }

        default:
            return state
    }
}