<template lang="">
  <section
    class="content-main">
    <div class="content-header">
      <h2 class="content title">
        제품 수정
      </h2>
      <div>
        <RouterLink
          to="/admin/product-list"
          class="btn btn-outline-primary">
          취소하기
        </RouterLink>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="EditProduct()">
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
                class="form-control" />
            </div>
            <div
              class="input-radio"
              @change="printSoldout">
              <div class="form-check">
                <input
                  id="false"
                  v-model="isSoldOut"
                  value="In Sale"
                  class="form-check-input"
                  type="radio"
                  name="isSoldOut" />
                <label
                  class="form-check-label"
                  for="false">
                  판매가능
                </label>
              </div>
              <div class="form-check">
                <input
                  id="true"
                  v-model="isSoldOut"
                  value="Sold Out"
                  class="form-check-input"
                  type="radio"
                  name="isSoldOut" />
                <label
                  class="form-check-label"
                  for="true">
                  상품매진
                </label>
              </div>
              <div class="check-soldout">
                <div v-if="isSoldOut === 'Sold Out' ">
                  <span class="badge rounded-pill alert-danger">{{ isSoldOut }}</span>
                </div>
                <div v-else>
                  <span class="badge rounded-pill alert-success">{{ isSoldOut }}</span> 
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
              rows="4"></textarea>
          </div>
          <div class="mb-4">
            <label class="form-label">제품 썸네일</label>
            <input
              class="form-control"
              type="file"
              
              @change="selectThumbnail" />
          </div>
          <div class="mb-4 image-price-tag">
            <img
              class="image-preview"
              :src="thumbnail"
              alt="" />
            <div class="row gx-2 col-6">
              <div>
                <label class="form-label">가격</label>
                <input
                  v-model="price"
                  type="text"
                  class="form-control" />
              </div>
              <div>
                <div class="mt-4">
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
          <button
            class="btn btn-outline-primary">
            제품 수정하기
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
      thumbnail: this.oldThumbnail,
      isSoldOut: this.oldIsSoldOut === 'false' ? 'In Sale' : 'Sold Out',
    }
  },
  computed: {
    chanageSoldOut() {
      return this.isSoldOut === 'In Sale' ? false : true 
    },
    defaultThumbnail() {
      const reader = new FileReader()
      reader.readAsDataURL(this.oldThumbnail)
      reader.addEventListener('load', () => {
        this.thumbnail = reader.result
      })
      return this.thumbnail
    }
  },
  mounted() {
    console.log(this.oldThumbnail)
    console.log(this.thumbnail)
    this.defaultThumbnail()
  },
  methods: {
    printSoldout() {
      console.log(this.chanageSoldOut)
    },
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
          thumbnailBase64: this.thumbnail,
          isSoldOut: this.chanageSoldOut
        }
      })
      console.log(res)
      this.$router.push('/admin/product-list')
      } catch(error) {
        console.log(error)
      }
    },
    selectThumbnail(e) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.addEventListener('load', () => {
        this.thumbnail = fileReader.result
      })
    },
    onSumbmit() {
      return this.$router.push('/admin/product-list')
    }
  }
}
</script>
<style lang="scss" scoped>
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
      box-shadow: 0 0.1rem 0.25rem rgb(0 0 0 / 8%);
      display: flex;
      flex-direction: column;
      min-width: 0;
      word-wrap: break-word;
      background-color: #fff;
      background-clip: border-box;
      border: 1px solid #cfdbe6;
      border-radius: 0.25rem;
      
      }
      .form-control[type=file] {
      overflow: hidden;
      }
      .form-control {
      display: block;
      width: 100%;
      padding: 0.2rem;
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
      .title-soldout {
        .form-check {
          margin-top: 2px;
          line-height: 1.5rem;
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
        border: 1px solid rgba(222,226,230,.7);
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
</style>
