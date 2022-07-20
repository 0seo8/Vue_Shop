<template lang="">
  <Doughnut
    :chart-data="chartData" />
</template>
<script>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ['생활가전', '계절가전', '디지털'],
        datasets: [
          {
            label: '카테고리별 매출 비중',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            
          }
        ]
      },
      chartOptions: {
        responsive: true,
      }
    }
  },
  computed: {
    categoryTotalSale: {
      
    }
  },
}
</script>
