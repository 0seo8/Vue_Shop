<template lang="">
  <section class="content-main">
    <div class="content-header">
      <h2 class="content title">
        제품 수정
      </h2>
      <div>
        <RouterLink
          to="/admin/product-list"
          class="btn btn-outline-danger">
          취소하기
        </RouterLink>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <form>
          <div class="mb-4 title-soldout">
            <div class="input-title">
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
            <div class="input-radio">
              <div class="form-check">
                <input
                  id="false"
                  v-model="isSoldOut"
                  value="In Sale"
                  class="form-check-input"
                  type="radio"
                  name="isSoldOut">
                <label
                  class="form-check-label"
                  for="false"> 판매가능 </label>
              </div>
              <div class="form-check">
                <input
                  id="true"
                  v-model="isSoldOut"
                  value="Sold Out"
                  class="form-check-input"
                  type="radio"
                  name="isSoldOut">
                <label
                  class="form-check-label"
                  for="true"> 상품매진 </label>
              </div>
              <div class="check-soldout">
                <div v-if="isSoldOut === 'Sold Out'">
                  <span class="badge rounded-pill alert-danger">{{
                    isSoldOut
                  }}</span>
                </div>
                <div v-else>
                  <span class="badge rounded-pill alert-success">{{
                    isSoldOut
                  }}</span>
                </div>
              </div>
            </div>
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
                  type="text"
                  class="form-control">
              </div>
              <div>
                <div class="mt-4">
                  <label
                    for="product_name"
                    class="form-label">태그</label>
                  <input
                    v-model="tags"
                    type="text"
                    class="form-control">
                </div>
              </div>
            </div>
          </div>
          <div
            class="btn btn-outline-danger"
            @click="EditProduct">
            제품 수정하기
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env
import axios from 'axios'

export default {
  props: {
    oldTitle: {
      type: String,
      default: ''
    },
    oldPrice: {
      type: String,
      default: ''
    },
    oldDescription: {
      type: String,
      default: ''
    },
    oldTags: {
      type: Array,
      default: () => []
    },
    oldThumbnail: {
      type: String,
      default: ''
    },
    oldIsSoldOut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productId: this.$route.params.id,
      title: this.oldTitle,
      price: this.oldPrice,
      description: this.oldDescription,
      tags: this.oldTags,
      thumbnailBase64: this.oldThumbnail,
      isSoldOut: this.oldIsSoldOut === 'false' ? 'In Sale' : 'Sold Out',
      defaultThumbnail: ''
    }
  },
  computed: {
    chanageSoldOut() {
      return this.isSoldOut === 'In Sale' ? false : true
    }
  },
  methods: {
    async EditProduct() {
      try {
        const res = await axios({
          url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${this.productId}`,
          headers: {
            'content-type': 'application/json',
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
            masterKey: true
          },
          method: 'PUT',
          data: {
            title: this.title,
            price: this.price,
            description: this.description,
            tags: this.tags ? this.tags.split(',') : [],
            thumbnailBase64:
              /(\.gif|\.jpg|\.jpeg|\.webp)$/i.test(this.thumbnailBase64) && '',
            isSoldOut: this.chanageSoldOut
          }
        })
        console.log(res)
        this.$swal({
          title: `<span>${this.title}</span>
        제품이 수정 되었습니다!`,
          text: this.description,
          icon: 'success',
          imageUrl: this.thumbnailBase64,
          width: 500,
          confirmButtonColor: '#f2555a',
          willClose: () => {
            this.$router.push({
              name: 'AdminProductList'
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
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
@import '~/scss/main';
.content-main {
  font-size: 12px;
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
    .title-soldout {
      display: flex;
      align-items: flex-end;
      .input-title {
        flex-grow: 1;
      }
      .input-radio {
        flex-grow: 1;
        margin-left: 2rem;
        display: flex;
        justify-content: space-around;
        border: 1px solid #cfdbe6;
        border-radius: 0.25rem;
        padding: 0.4rem 0.25rem;
      }
    }
    .card {
      position: relative;
    }
    .form-control[type='file'] {
      overflow: hidden;
    }
    .form-control {
      display: block;
      width: 100%;
      padding: 0.2rem;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.5;
      color: $font-navy;
    }
    .title-soldout {
      .input-radio {
        .form-check {
          margin-top: 2px;
          line-height: 1.2rem;
          padding-top: 3px;
        }
      }

      span {
        width: 70px;
        padding: 0.5rem 0.4rem;
      }
    }
    .image-price-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid rgba(222, 226, 230, 0.7);
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

.content-main .card {
  color: var(--color-text-base);
  background-color: var(--color-info-bg);
}

</style>
