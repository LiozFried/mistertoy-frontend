import { BranchesMap } from "../cmps/BranchesMap"
import { useState, useEffect } from "react"

export function About() {

    const [isMapOpen, setIsMapOpen] = useState(false)

    function toggleOpemMap() {
        setIsMapOpen(!isMapOpen)
    }

    return (
        <section className="about container">
            <h2>About Us</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                Atque eaque voluptatem est tempore fuga impedit,<br />
                porro nobis nulla incidunt numquam!
            </p>

            <button onClick={toggleOpemMap}>Show Branches</button>
            {isMapOpen && <BranchesMap />}
        </section>
    )
}