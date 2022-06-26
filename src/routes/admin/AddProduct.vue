<template lang="">
  <div>
    <div class="add-product">
      <h1>제품 추가하기</h1>
      <div>
        <form
          class="add-form"
          @submit.prevent="AddProduct()">
          <div class="form-item">
            <label for="name">제품명</label>
            <input
              id="name"
              v-model="title"
              type="text"
              name="name" />
          </div>
          <div class="form-item">
            <label for="price">가격</label>
            <input
              id="price"
              v-model="price"
              type="text"
              name="price" />
          </div>
          <div class="form-item">
            <label for="description">제품 설명</label>
            <input
              id="description"
              v-model="description"
              type="text"
              name="description" />
          </div>
          <div class="form-item">
            <label for="tags">태그</label>
            <input
              id="tags"
              v-model="tags"
              type="text"
              name="tags" />
          </div>
          <div class="form-item">
            <label for="image">이미지</label>
            <input
              id="image"
              v-model="image"
              type="text"
              name="image" />
          </div>
          <div class="submit-btn">
            <button
              type="submit">
              제품 추가
            </button>
            <RouterLink to="/admin">
              <button>제품 목록</button>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      image: ''
    }
  },
  methods: {
    async AddProduct () {
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        headers: {
        'content-type': 'application/json',
        apikey: VITE_API_KEY,
        username: VITE_USERNAME,
        masterKey: true
        },
        method: 'POST',
        data: {
          title: this.title,
          price: this.price,
          description: this.description,
          tags: this.tags,
          image: this.image
        }
      })
      console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-product {
  margin: 0 auto;
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  .add-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      label {
        width: 100px;
        text-align: right;
        margin-right: 10px;
      }
      input {
        width: 200px;
        margin-left: 10px;
      }
    }
  }
}
</style>
