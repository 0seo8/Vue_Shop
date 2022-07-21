<template>
  <Bar
    :chart-data="chartData"
    height="200" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import{mapState} from 'vuex'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
    ...mapState('admin', ['transactionDetail']),
    products() {
      return this.transactionDetail.map(detail => detail.product)
    },
    productData() {
      const tags = [{ tag: ' 노트북', price: 0 }, { tag: ' 모니터', price: 0 }, { tag: ' 청소기', price: 0 }, { tag: ' 에어컨', price: 0 }, { tag: ' 선풍기', price: 0 }, { tag: ' 커피머신', price: 0 }, { tag: ' 태블릿', price: 0 }, { tag: ' 스마트 웨어러블', price: 0 }]
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
        labels: ['노트북', '모니터', '청소기', '에어컨', '선풍기', '커피머신', '태블릿', '스마트 웨어러블'],
        datasets: [
          {
            label: 'Electron Market Sale Data',
            data: [this.productData[0].price, this.productData[1].price, this.productData[2].price, this.productData[3].price, this.productData[4].price, this.productData[5], this.productData[6].price, this.productData[7].price],
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
  methods: {
    
  }
}
</script>
