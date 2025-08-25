import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <div className="toy-preview">
            <h1 className="toy-name">{toy.name}</h1>
            <div className="img-container">
                <img src={toy.imgUrl} alt={toy.name} />
            </div>
            <h2>Price: ${toy.price}</h2>
            <h2 className={toy.isStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h2>
        </div>
    )
}