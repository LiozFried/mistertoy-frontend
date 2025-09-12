import { useEffect, useRef, useState } from "react"
import { debounce } from '../services/util.service'
import { toyService } from "../services/toy.service"
import { FilterMultipleSelectLabels } from "./FilterMultipleSelectLabels"

export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy || toyService.getDefaultFilter())

    const setFilterDebounce = useRef(debounce(onSetFilter, 300)).current

    useEffect(() => {
        setFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(event) {
        let { value, name: field } = event.target

        if (event.target.type === 'select-multiple') {
            value = [...event.target.selectedOptions].map(option => option.value)
        } else {
            value = event.target.type === 'number' ? +value : value
        }

        if (field === 'inStock') {
            value = toyService.getInStockValue(value)
        }


        if (field === 'sort-type') {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, sortBy: { ...prevFilter.sortBy, type: value } }))
            return
        }
        if (field === 'sort-desc') {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, sortBy: { ...prevFilter.sortBy, desc: +value } }))
            return
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleLabelsChange(event) {
        const { value } = event.target
        const valueToSet = typeof value === 'string' ? value.split(',') : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: valueToSet }))
    }

    const { txt, inStock, labels, sortBy: sort } = filterByToEdit

    return (
        <section className="toy-filter">
            <h3>Toy Filter</h3>
            <form className="filter-form flex align-center">
                <input
                    type="text" name="txt" placeholder="Search"
                    value={txt} onChange={handleChange}
                />

                <select name="inStock" value={inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not In Stock</option>
                </select>

                {toyLabels &&
                    <FilterMultipleSelectLabels
                        labels={toyLabels}
                        value={labels || []}
                        onChange={handleLabelsChange}
                    />
                }

                <select name="sort-type" value={sort.type} onChange={handleChange}>
                    <option disabled value="">Sort By:</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Date Created</option>
                </select>

                <select name="sort-desc" value={sort.desc} onChange={handleChange}>
                    <option value="1">Ascending</option>
                    <option value="-1">Descending</option>
                </select>
            </form>
        </section>
    )
}

