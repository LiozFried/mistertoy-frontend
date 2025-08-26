import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { Chat } from "../cmps/Chat"
import { PopUp } from "../cmps/PopUp"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Cannot show toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    const formattedDate = new Date(toy.createdAt).toLocaleString('he')
    return (
        <section className="toy-details">
            <h1>Toy Name: <span>{toy.name}</span></h1>
            <h1>Toy Price: <span>${toy.price}</span></h1>
            <h1>Labels: <span>{toy.labels.join(' ,')}</span></h1>
            <h1>Created At: <span>{formattedDate}</span></h1>
            <h1 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h1>
            <button className="back-btn">
                <Link to="/toy">Back</Link>
            </button>

            <section>
                <PopUp
                    header={<h3>Chat About {toy.name}s</h3>}
                    footer={<h4>&copy; Mister-Toy</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat />
                </PopUp>
            </section>
            {!isChatOpen && <button onClick={() => setIsChatOpen(true)} className='open-chat'>Chat</button>}
        </section>
    )
}

