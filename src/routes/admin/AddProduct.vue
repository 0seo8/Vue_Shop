<template lang="">
  <section
    class="content-main">
    <div class="content-header">
      <h2 class="content title">
        제품 추가
      </h2>
      <div>
        <RouterLink
          to="/admin"
          class="btn btn-outline-danger">
          취소하기
        </RouterLink>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="AddProduct()">
          <div class="mb-4">
            <label
              for="product_name"
              class="form-label">제품명*</label>
            <input
              id="product_name"
              v-model="title"
              type="text"
              placeholder="제품명을 입력하세요!"
              class="form-control" />
          </div>
          <div class="mb-4">
            <label class="form-label">제품 설명*</label>
            <textarea
              v-model="description"
              placeholder="제품 설명을 입력하세요!"
              class="form-control"
              rows="4"></textarea>
          </div>
          <div class="mb-4">
            <label class="form-label">제품 썸네일</label>
            <input
              class="form-control"
              type="file"
              @change="selectThumbnail" />
          </div>
          <div class="mb-4">
            <div class="row gx-2">
              <div class="col-6">
                <label class="form-label">가격</label>
                <input
                  v-model="price"
                  type="text"
                  class="form-control" />
              </div>
              <div class="col-6">
                <div class="mb-4">
                  <label
                    for="product_name"
                    class="form-label">태그</label>
                  <input
                    v-model="tags"
                    type="text"
                    class="form-control" />
                </div>
              </div>
            </div> <!-- row.// -->
          </div>
          <button class="btn btn-primary">
            제품 추가하기
          </button>
        </form>
      </div>
    </div>
  </section>
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
      thumbnailBase64: ''
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
          image: this.thumbnailBase64
        }
      })
      // console.log(this.title, this.price, this.description, this.tags, this.image)
      console.log(res)
    },
    selectThumbnail(e) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.addEventListener('load', () => {
        this.thumbnailBase64 = fileReader.result
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-main {
    max-width: 720px;
    padding: 30px 3%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    .content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    form {
    display: block;
    margin-top: 0em;
    .card {
      position: relative;
      box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
      display: flex;
      flex-direction: column;
      min-width: 0;
      word-wrap: break-word;
      background-color: #fff;
      background-clip: border-box;
      border: 0 solid rgba(222,226,230,.7);
      border-radius: 0.25rem;;}
      .form-control[type=file] {
      overflow: hidden;
      }
      .form-control {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #141432;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #cfdbe6;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0.25rem;
      box-shadow: 0;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }
    }
  }
</style>
