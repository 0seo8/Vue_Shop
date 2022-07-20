<template lang="">
  <Doughnut
    :chart-data="chartData" />
</template>
<script>
import {mapState} from 'vuex'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'
// import product from '../../../store/product'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  computed: {
    ...mapState('admin', ['transactionDetail']),
    products() {
      return this.transactionDetail.map(detail => detail.product)
    },
    category() {
      const tags = [{ tag: '생활가전', price: 0 }, { tag: '계절가전', price: 0 }, { tag: '디지털', price: 0 }]
      for (let i = 0; i < this.products.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (this.products[i].tags.includes(tags[j].tag)) {
            tags[j].price += this.products[i].price
          }
        }
      }
      return tags
    },
    chartData() {
      return {
        labels: ['생활가전', '계절가전', '디지털'],
        datasets: [
        {
          label: '카테고리별 매출 비중',
          data: [this.category[0].price, this.category[1].price, this.category[2].price ],
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
      }
    },
    chartOptions() {
      return {responsive: true,}
    }
  },
  mounted() {
    return this.$store.dispatch('admin/readTransactionDetail')
  },
}
</script>
