export const state = () => ({
  products: [],
  categories: [
        { _id: false, title: 'Semua' },
  ],

      categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
  updateProducts(state, products) {
    state.products = products
  },
  updatecategories(state, categories) {
    // ngepush array yang ada diatas & yang ada dari database
    state.categories.push(...categories)
  },
}

export const actions = {
  updateCategoryId({commit}, categoryId) {
    commit('updateCategoryId', categoryId)
  },
  fetchProducts({ commit }) {
    return this.$axios.$get('http://localhost:3001/products').then(response => {
      commit('updateProducts', response.products)
      // console.log(response);
    })
  },
  fetchCategories({ commit }) {
    return this.$axios.$get('http://localhost:3001/categories').then(response => {
      commit('updatecategories', response.categories)
    })
  }
}
