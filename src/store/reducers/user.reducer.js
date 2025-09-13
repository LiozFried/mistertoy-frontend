import { userService } from '../../services/user.service'

export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
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