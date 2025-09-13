import { httpService } from './http.service'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
}

const BASE_URL = 'auth/'
const SESSION_STORAGE_KEY = 'loggedinUser'

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.log('Could not login', err)
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(BASE_URL + 'signup', credentials)
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.log('Could not signup', err)
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(SESSION_STORAGE_KEY)
    } catch (err) {
        console.log('Could not logout', err)
    }
}

function getLoggedinUser() {
    const entity = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(entity)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
}