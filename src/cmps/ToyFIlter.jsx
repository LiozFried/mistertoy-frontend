import { useEffect, useRef, useState } from "react"
import { debounce } from '../services/util.service'
import { toyService } from "../services/toy.service"

export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const setFilterDebounce = useRef(debounce(onSetFilter, 300)).current

    useEffect(() => {
        setFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        } else {
            value = type === 'number' ? +value : value
        }

        if (field === 'inStock') {
            value = toyService.getInStockValue(value)
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <h3>Toy Filter</h3>
            <form className="flex align-center">
                <input
                    type="text" name="txt" placeholder="Search"
                    value={txt} onChange={handleChange}
                />

                <select name="inStock" value={inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not In Stock</option>
                </select>

                {toyLabels && <select
                    multiple name="labels"
                    value={labels || []} onChange={handleChange}
                >
                    <option disabled value="">Labels:</option>
                    <>
                        {toyLabels.map(label => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </>
                </select>
                }
            </form>
        </section>
    )
}

