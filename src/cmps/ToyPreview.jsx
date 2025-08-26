import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <Link to={`/toy/${toy._id}`}>
            <div className="toy-preview">
                <h1 className="toy-name">{toy.name}</h1>
                <div className="img-container">
                    <img src={toy.imgUrl} alt={toy.name} />
                </div>
                <h1>Price: ${toy.price}</h1>
                <h1 className={toy.inStock ? 'green' : 'red'}>
                    {toy.inStock ? 'In stock' : 'Not in stock'}
                </h1>
            </div>
        </Link>
    )
}