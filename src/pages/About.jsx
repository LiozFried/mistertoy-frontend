import { BranchesMap } from "../cmps/BranchesMap"

export function About() {
    return (
        <section className="about container">
            <h2>About Us</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                Atque eaque voluptatem est tempore fuga impedit,<br />
                porro nobis nulla incidunt numquam!
            </p>

            <button>Show Branches</button>
            <BranchesMap />
        </section>
    )
}