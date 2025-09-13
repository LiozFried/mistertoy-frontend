import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { login, signup } from "../store/actions/user.action"
import { LoginForm } from "./LoginForm"

export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        try {
            login(credentials)
            showSuccessMsg('Loggedin successfully')
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    function _signup(credentials) {
        try {
            signup(credentials)
            showSuccessMsg('Loggedin successfully')
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    return (
        <section className="login">
            <LoginForm onLogin={onLogin} isSignup={isSignup}/>
            <div>
                <a href="#" onClick={() => setIsSignup(prev => !prev)}>
                    {isSignup ? 'Already Member? login' : 'New? Signup here'}
                </a>
            </div>
        </section>
    )
}