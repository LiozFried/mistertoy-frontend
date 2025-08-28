import { useEffect, useState } from "react"
import { toyService } from '../services/toy.service'
import { getRandomColor } from "../services/util.service"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

export function LabelsInventory() {

    const [labelsInventory, setLabelsInventory] = useState(null)

    useEffect(() => {
        loadLabelsInventory()
    }, [])

    function loadLabelsInventory() {
        toyService.getToyLabelsInventory()
            .then(newLabelsInventory => {
                console.log('Success get labels inventory', newLabelsInventory)
                setLabelsInventory(newLabelsInventory)
            })
    }

    function getData(labelsInventory) {
        const labels = labelsInventory.map(item => item.label)
        const data = labelsInventory.map(item => item.inventory === 0 ? 0.0000001 : item.inventory)

        const backgroundColors = labels.map(() => getRandomColor(0.2))
        const borderColors = backgroundColors.map(color => color.replace('0.2', '1'))

        return {
            labels,
            datasets: [
                {
                    label: '# Toys In Stock',
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ]
        }
    }

    if (!labelsInventory) return <div>Loading...</div>

    const data = getData(labelsInventory)

    return (
        <div style={{ width: '350px', margin: 'auto' }}>
            <h2>Toys In Stock by Label</h2>
            <Pie data={data} />
        </div>
    )
}