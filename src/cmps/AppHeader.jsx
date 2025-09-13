import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.action"
import { LoginSignup } from "./LoginSignup"

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        try {
            logout()
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }
    return (
        <section className="app-header container full">
            <div className="logo">Mister Toy</div>
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <div className="nav-container">
                <nav className="flex justify-between">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </div>
        </section>
    )
}