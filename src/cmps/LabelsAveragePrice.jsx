import { useEffect, useState } from "react"
import { toyService } from '../services/toy.service'
import { getRandomColor } from "../services/util.service"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

export function LabelsAveragePrice() {

    const [labelsAveragePrice, setLabelsAveragePrice] = useState(null)

    useEffect(() => {
        loadLabelsAveragePrice()
    }, [])

    function loadLabelsAveragePrice() {
        toyService.getToyLabelsAveragePrice()
            .then(newLabelsAveragePrice => {
                console.log('Success get average prices', newLabelsAveragePrice)
                setLabelsAveragePrice(newLabelsAveragePrice)
            })
    }

    function getData(labelsAveragePrice) {
        const labels = labelsAveragePrice.map(item => item.label)
        const data = labelsAveragePrice.map(item => item.averagePrice)

        const backgroundColors = labels.map(() => getRandomColor(0.2))
        const borderColors = backgroundColors.map(color => color.replace('0.2', '1'))

        return {
            labels,
            datasets: [
                {
                    label: 'Average Price ($)',
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ]
        }
    }

    if (!labelsAveragePrice) return <div>Loading...</div>

    const data = getData(labelsAveragePrice)

    return (
        <div style={{width: '350px', margin: 'auto'}}>
            <h2>Average Price by Label</h2>
            <Pie data={data} />
        </div>
    )
}
