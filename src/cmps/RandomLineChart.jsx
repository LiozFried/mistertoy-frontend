import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getRandomIntInclusive } from '../services/util.service'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function RandomLineChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Toy Prices Over Time',
            },
        },
    }

    function getRandomDates(numDates) {
        const dates = []
        const now = new Date()
        for (let i = 0; i < numDates; i++) {
            const daysAgo = getRandomIntInclusive(0, 180)
            const randomDate = new Date(now.setDate(now.getDate() - daysAgo))
            dates.push(randomDate.toLocaleDateString())
        }

        return dates.sort((a, b) => new Date(a) - new Date(b))
    }

    const labels = getRandomDates(10)

    const data = {
        labels,
        datasets: [
            {
                label: 'Toy Prices',
                data: labels.map(() => getRandomIntInclusive(10, 180)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return <Line options={options} data={data} />
}