import { Link } from "react-router-dom"

export function ToyList({ onRemoveToy, toys }) {

    return (
        <section className="toy-list container">
            <ul>
                {toys.map(toy => (
                    <li key={toy._id}>
                        <div>
                            <button>
                                Edit (not available)
                            </button>
                            <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}