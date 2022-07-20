<template lang="">
  <section class="product-section">
    <div class="container-product">
      <div class="content-header">
        <h2>제품 목록</h2>
        <AdminButton />
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <table>
            <div
              v-for="(product, index) in products"
              :key="product.id"
              class="row">
              <div
                v-for="column in columns"
                :key="column.name"
                :class="column.col">
                <template
                  v-if="column.field === 'index'">
                  {{ index + 1 }}
                </template>

                <template v-else-if="column.field === 'thumbnail'">
                  <img
                    class="thumbnail"
                    :src="
                      product.thumbnail
                        ? product.thumbnail
                        : 'data:image/jpeg;base64,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'
                    "
                    alt="">
                </template>

                <template v-else-if="column.field === 'isSoldOut'">
                  <span
                    v-if="product[column.field]"
                    class="badge rounded-pill alert-danger">매진</span>
                  <span
                    v-else
                    class="badge rounded-pill alert-success">주문가능</span>
                </template>
                <template v-else-if="column.field === 'dropdown'" />
                <template v-else-if="column.field === 'tags'">
                  {{ product.tags.toString() }}
                </template>
                <template v-else-if="column.field === 'price'">
                  {{ product.price.toLocaleString() + '원' }}
                </template>
                <template v-else>
                  {{ product[column.field] }}
                </template>
              </div>
              <div class="dropdown float-end">
                <button
                  id="dropdownMenuButton1"
                  class="dropdown-toggle btn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanede="false">
                  <span class="material-symbols-outlined">more_horiz</span>
                </button>
                <div class="dropdown-menu">
                  <button
                    href="#"
                    class="dropdown-item">
                    <RouterLink
                      :to="{
                        name: 'EditProduct',
                        params: {
                          id: product.id,
                          oldTitle: product.title,
                          oldPrice: product.price,
                          oldDescription: product.description,
                          oldTags: product.tags.toString(),
                          oldThumbnail: product.thumbnail,
                          oldIsSoldOut: product.isSoldOut,
                        },
                      }">
                      Edit Product
                    </RouterLink>
                  </button>
                  <button
                    class="dropdown-item"
                    @click="deleteProduct(product)">
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AdminButton from '../../components/AdminButton.vue'
import axios from 'axios'
import noImage from '~/routes/admin/noImage.js'
const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

export default {
  components: {
    AdminButton,
  },
  data() {
    return {
      columns: [
        { field: 'index', name: '', col: 'column-auto flex-grow-0 col-index' },
        {
          field: 'thumbnail',
          name: '이미지',
          col: 'column col-lg-auto col-sm-auto col-auto col-thumbnail',
        },
        {
          field: 'title',
          name: '제목',
          col: 'column col-lg-3 col-sm-2 col-5 col-title',
        },
        {
          field: 'price',
          name: '가격',
          col: 'column col-lg-2 col-sm-2 col-3 col-price',
        },
        {
          field: 'tags',
          name: '태그',
          col: 'column col-lg-2 col-sm-2 col-4 col-tags',
        },
        {
          field: 'isSoldOut',
          name: '매진여부',
          col: 'column col-lg-2 col-sm-2 col-4 col-isSoldOut',
        },
      ],
    }
  },
  computed: {
    products() {
      return this.$store.state.admin.productList
    },
  },
  created() {
    this.$store.dispatch('admin/readProducts')
  },
  methods: {
    async deleteProduct(product) {
      const { id, thumbnail } = product
      try {
        const res = await axios({
          url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
          headers: {
            'content-type': 'application/json',
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
            masterKey: true,
          },
          method: 'DELETE',
        })
        console.log(res)
        this.$store.dispatch('admin/readProducts')
        this.$swal({
          title: '제품이 삭제되었습니다!',
          icon: 'success',
          imageUrl: thumbnail,
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: noImage,
          width: 400,
          confirmButtonColor: '#f2555a',
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
section {
  min-width: 460px;
  padding: 60px 6%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  .content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  table {
    width: 100%;
  }
  .row {
    justify-content: center;
    text-decoration: none !important;
    padding: 0.7rem;
    align-items: center;
    border-bottom: 1px solid rgba(108, 117, 125, 0.25);
    border-top: 0;
    &:hover {
      background-color: rgba(49, 103, 235, 0.075);
    }
    .badge {
      padding: 0.4rem 0.8rem;
      font-size: 14px;
    }
    .col-isSoldOut {
      text-align: center;
    }
    .col-price {
      text-align: start;
    }
    .col-index {
      width: 60px;
      color: var(--color-gray-600)
    }
    .col-menu {
      text-align: cneter;
    }
    .dropdown {
      width: auto;
      .dropdown-menu {
        font-size: 14px;
        .dropdown-item {
          &:active {
              background-color: var(--color-sub-primary);
          a {
            text-decoration: none;
            color: #212529;
            }
          }
          &:last-child {
            color: #f2555a;
          }
          
        }
      }
      .dropdown-toggle::after {
        display: none;
      }
    }
  }

  .column {
    padding: 0.5rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    &.col-title {
      font-weight: bold;
    }
    .thumbnail {
      width: 80px;
      height: 80px;
      padding: 0.25rem;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.075);
      max-width: 100%;
      height: auto;
    }
  }
}

.card {
  background: var(--color-info-bg);
}
</style>
