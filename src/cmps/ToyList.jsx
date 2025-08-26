import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ onRemoveToy, toys }) {

    return (
        <section className="toy-list container">
            <ul>
                {toys.map(toy => (
                    <li className="clean-list" key={toy._id}>
                        <ToyPreview toy={toy} />
                        <div>
                            <button>
                                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                            </button>
                            <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}