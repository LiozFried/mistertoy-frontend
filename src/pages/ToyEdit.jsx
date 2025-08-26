import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.action"
import { useSelector } from "react-redux"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = useSelector(storeState => storeState.toyModule.toyLabels)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Cannot edit toy', err)
                navigate('/toy')
                showErrorMsg('Cannot edit toy')
            })
    }

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        } else if (type === 'select-multiple') {
            fieldValue = [...target.selectedOptions].map(option => option.value)
        }

        setToyToEdit(prevToy => ({ ...prevToy, [name]: fieldValue }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Toy ${savedToy._id} saved`)
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return (
        <section className="toy-edit">
            <h1>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSaveToy}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text" id="name" name="name"
                        value={toyToEdit.name} onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number" name="price" id="price"
                        value={toyToEdit.price} onChange={handleChange}
                        required min={"1"}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="labels">Labels:</label>
                    <select
                        name="labels" id="labels"
                        multiple
                        value={toyToEdit.labels} onChange={handleChange}
                    >
                        {labels.map(label => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {toyToEdit._id && (
                    <div className="form-group">
                        <label htmlFor="inStock">In Stock:</label>
                        <input
                            type="checkbox" name="inStock" id="inStock"
                            checked={toyToEdit.inStock}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <button>{toyToEdit._id ? 'Update Toy' : 'Add'}</button>
            </form>
        </section>
    )
}