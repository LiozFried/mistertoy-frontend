import { useState } from "react"
import { LabelsAveragePrice } from "../cmps/LabelsAveragePrice"
import { LabelsInventory } from "../cmps/LabelsInventory"
import { RandomLineChart } from "../cmps/RandomLineChart"

export function ToyDashboard() {
    const [activeChart, setActiveChart] = useState(null)

    function renderChart() {
        switch (activeChart) {
            case 'average-price':
                return <LabelsAveragePrice />
            case 'inventory':
                return <LabelsInventory />
            case 'line-chart':
                return <RandomLineChart />
            default:
                return null
        }
    }

    return (
        <section className="toy-dashboard">
            <div className="dashboard-btns">
                <button onClick={() => setActiveChart('average-price')}>Labels Average Price</button>
                <button onClick={() => setActiveChart('inventory')}>Labels Inventory</button>
                <button onClick={() => setActiveChart('line-chart')}>Random Line Chart</button>
            </div>
            {renderChart()}
        </section>
    )
}