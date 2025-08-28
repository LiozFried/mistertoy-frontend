import { LabelsAveragePrice } from "../cmps/LabelsAveragePrice";
import { useEffect, useState } from "react"

export function ToyDashboard() {

    return (
        <section className="toy-dashboard">
            <div className="dashboard-btns">
                <button>Labels Average Price</button>
                <button></button>
                <button></button>
            </div>

            <LabelsAveragePrice />
        </section>
    )
}