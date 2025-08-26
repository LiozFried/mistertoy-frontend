import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <section className="app-header container">
            <div className="logo">Mister Toy</div>
            <div className="flex justify-between">
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>
            </div>
        </section>
    )
}