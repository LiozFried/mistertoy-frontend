export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: null
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //User:
        case SET_USER:
            return { ...state, loggedinUser: cmd.user }

        default:
            return state
    }
}