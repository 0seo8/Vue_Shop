<template lang="">
  <section class="content-main">
    <div class="content-header">
      <h2 class="content title">
        제품 추가
      </h2>
      <div>
        <RouterLink
          to="/admin/product-list"
          class="btn btn-outline-danger btn-sm">
          취소하기
        </RouterLink>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <form>
          <div class="mb-4">
            <label
              for="product_name"
              class="form-label">제품명*</label>
            <input
              id="product_name"
              v-model="title"
              type="text"
              placeholder="제품명을 입력하세요!"
              class="form-control">
          </div>
          <div class="mb-4">
            <label class="form-label">제품 설명*</label>
            <textarea
              v-model="description"
              placeholder="제품 설명을 입력하세요!"
              class="form-control"
              rows="4" />
          </div>
          <div class="mb-4">
            <label class="form-label">제품 썸네일</label>
            <input
              id="formFile"
              class="form-control"
              type="file"
              @change="selectThumbnail">
          </div>
          <div class="mb-4 image-price-tag">
            <img
              class="image-preview"
              :src="thumbnailBase64"
              alt="">
            <div class="row gx-2 col-6">
              <div>
                <label class="form-label">가격</label>
                <input
                  v-model="price"
                  placeholder="가격을 입력하세요."
                  type="number"
                  class="form-control">
              </div>
              <div>
                <div class="mt-4">
                  <label
                    for="product_name"
                    class="form-label">태그</label>
                  <input
                    v-model="tags"
                    placeholder="쉼표로 구분됩니다."
                    type="text"
                    class="form-control">
                </div>
              </div>
            </div>
            <!-- row.// -->
          </div>
          <div
            class="btn btn-outline-danger btn-sm"
            type="submit"
            @click="AddProduct">
            제품 추가
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env
import noImage from '~/routes/admin/noImage.js'
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnailBase64: noImage,
    }
  },
  methods: {
    async AddProduct() {
      try {
        await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
          headers: {
            'content-type': 'application/json',
            'apikey': VITE_API_KEY,
            'username': VITE_USERNAME,
            'masterKey': true,
          },
          method: 'POST',
          data: {
            title: this.title,
            price: Number(this.price),
            description: this.description,
            tags: this.tags ? this.tags.split(',') : [],
            thumbnailBase64: this.thumbnailBase64,
          },
        })
        this.$swal({
          title: `${this.title} 제품이 등록되었습니다!`,
          text: this.description,
          icon: 'success',
          imageUrl: this.thumbnailBase64,
          imageWidth: 100,
          imageHeight: 100,
          width: 500,
          confirmButtonColor: '#f2555a',
          willClose: () => {
            this.$router.push({
              name: 'AdminProductList',
            })
          },
        })
        this.resetInput()
      } catch (error) {
        console.log(error.message)
      }
    },
    selectThumbnail(e) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.addEventListener('load', () => {
        this.thumbnailBase64 = fileReader.result
      })
    },
    resetInput() {
      (this.title = ''),
        (this.price = ''),
        (this.description = ''),
        (this.tags = ''),
        (this.thumbnailBase64 = '')
    },
  },
}
</script>
<style lang="scss" scoped>
body {
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
    .card {
      background-color: var(--color-info-bg);
      input, textarea {
        background-color: whitesmoke;
      }
    }
    form {
      .btn {
        color: inherit;
      }
      display: block;
      margin-top: 0em;
      .form-control[type="file"] {
        overflow: hidden;
      }
      .form-control {
        display: block;
        width: 100%;
        padding: 0.2rem;
        font-size: 0.7rem;
        font-weight: 400;
        line-height: 1.5;
        color: var(--color-gray-1000);
      }
      .image-price-tag {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var( --color-gray-200);
        padding: 0.5rem 1rem;
        border-radius: 6px;

        .image-preview {
          margin: 0 auto;
          width: 100px;
        }
      }
      .row.gx-2 {
        display: block;
      }
    }
  }
}
</style>
