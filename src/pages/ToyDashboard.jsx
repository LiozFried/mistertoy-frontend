import { useEffect, useState } from "react"
import { LabelsAveragePrice } from "../cmps/LabelsAveragePrice";
import { LabelsInventory } from "../cmps/LabelsInventory";

export function ToyDashboard() {

    return (
        <section className="toy-dashboard">
            <div className="dashboard-btns">
                <button>Labels Average Price</button>
                <button></button>
                <button></button>
            </div>

            <LabelsAveragePrice />
            <LabelsInventory />
        </section>
    )
}