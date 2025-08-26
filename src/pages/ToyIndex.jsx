import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ToyFilter } from "../cmps/ToyFIlter"
import { ToyList } from "../cmps/ToyList"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, setFilter } from "../store/actions/toy.action"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('error', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy has removed'))
            .catch(err => {
                console.log('error', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    return (
        <section className="toy-index">
            <ToyFilter
                filterBy={filterBy} onSetFilter={onSetFilter} toyLabels={toyLabels}
            />

            <button className="add-toy-btn">
                <Link to="/toy/edit">Add Toy</Link>
            </button>

            {isLoading && <div>Loading...</div>}
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
        </section>
    )
}