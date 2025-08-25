import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

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
            <p>filter cmp</p>

            <button className="add-toy-btn">
                add toy (not available)
            </button>

            
        </section>
    )
}