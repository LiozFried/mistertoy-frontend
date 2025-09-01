import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <section className="app-header container full">
            <div className="logo">Mister Toy</div>
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