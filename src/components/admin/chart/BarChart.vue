<template>
  <Bar
    :chart-data="chartData"
    height="200" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['모니터', '청소기', '노트북', '에어컨', '에어팟', '선풍기', '커피머신', '스마트 웨어러블'],
        datasets: [
          {
            label: 'Electron Market Sale Data',
            data: [12, 19, 3, 5, 2, 3, 2, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 200, 255, 0.2)',
                'rgba(255, 60, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 200, 255, 1)',
                'rgba(255, 60, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    }
  },
}
</script>
