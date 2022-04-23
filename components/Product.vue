<template>
  <div>
    <v-row align="center">
      <v-col cols="7">
        <v-autocomplete
          label="Produk"
          placeholder="Ketik untuk Mencari"
          :search-input.sync="search"
          :loading="isloading"
          :items="itemsSearch"
          item-text="title"
          item-value="_id"
          v-model="selectedSearch"
          return-object
          hide-no-data
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-menu>
          <template v-slot:activator="{ on: category }">
            <v-btn v-on="category" color="primary"> kategori </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(category, i) in categories"
                :key="i"
                :value="category._id"
                :disabled="category._id == categoryId"
                @change="updateCategoryId(category._id)"
              >
                <v-list-item-title> {{ category.title }} </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(product, i) in filteredProducts" :key="i.id" cols="2">
        <v-card
          class="product-card"
          @click="addToCart(product._id)"
          :title="product.title"
          :ripple="true"
        >
          <v-card-actions>
            <v-img
              class="product-pic"
              :src="require(`@/assets/images/products/${product.thumbnail}`)"
            >
            </v-img>
          </v-card-actions>
          <v-card-text
            align="center"
            class="product-title"
            :title="products.title"
          >
            {{ product.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      search: null,
      isloading: false,
      itemsSearch: [],
      selectedSearch: null,
    }
  },
  methods: {
    ...mapActions({
      updateCategoryId: 'products/updateCategoryId',
      addToCart: 'carts/addToCart',
      fetchProducts: 'products/fetchProducts',
      fetchCategories: 'products/fetchCategories',
      //harusnya bisabikin action lagi untuk update categoryID itu atau langsung mutation
    }),
    resetSearchCategory() {
      //MASALAHNYA DISINI
      // categoryId dapat dari state, kalau mau ubah harusnua pakai mutation atau action, gak bisa langsung set disini
      //tapi karena nanti ini juga gak akan di pakai, error jg gpp mas, nanti di ganti kok di video selanjutnya
      this.updateCategoryId(0)
      // this.categoryId = false
    },
  },
  computed: {
    ...mapState('products', {
      products: 'products',
      categories: 'categories',
      categoryId: 'categoryId',
    }),

    filteredProducts() {
      if (this.categoryId) {
        console.log(this.categories)
        return this.products.filter(
          (product) => product.categoryId == this.categoryId
        )
      }
      return this.products
    },
  },
  watch: {
    search(val) {
      console.log(val)
      this.isloading = true
      setTimeout(() => {
        this.itemsSearch = this.products.filter((e) => {
          this.isloading = false
          this.resetSearchCategory()
          return e.title
        })
      }, 2000)
    },
    selectedSearch(product) {
      if (product) {
        this.addToCart(product._id)
      }
    },
  },
  //livecycle saat komponen diload bakal manggil product ini
  mounted() {
    this.fetchProducts(), this.fetchCategories()
  },
}
</script>

<style scoped>
.product-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-pic {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  height: 150px;
}

.product-card {
  height: 230px;
}

.product-pic:hover {
  box-shadow: 0 0 5px 3px rgba(22, 184, 30, 0.5);
}
</style>
