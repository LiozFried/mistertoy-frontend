import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ onRemoveToy, toys }) {

    return (
        <section className="toy-list container">
            <ul>
                {toys.map(toy => (
                    <li key={toy._id}>
                        <ToyPreview toy={toy} />
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