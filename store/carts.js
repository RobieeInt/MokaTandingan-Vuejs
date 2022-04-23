export const state = () => ({
  items: [],
  additionals: [
    {
      title: 'Tax',
      mode: 'percentage',
      value: 11,
    },
    {
      title: 'Service Charge',
      mode: 'fix',
      value: 50000,
    },
  ]
})

// Getter digunakan untuk mengubah/manipulasi string/data yang ada sebelum ditampilkan ke user

export const getters = {
  //untuk nampilin data/item yang ada di product berdasarkan _id (berasak dari db)
  cartItems:(state,getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      let product = rootState.products.products.find(product => product._id === id)

      return {
        id: id,
        title: product.title,
        price: product.price,
        quantity,
      }
    })
  },
  // kalkulasi harga * qty
  itemTotal: () => (price, quantity) => {
    return price * quantity
  },
  //melakukan getter biar bisa akses cartitems dan reduce untuk itung total (nilai sebelumnya/previous value yang di setting 0) + harga*qty
  subTotal: (state, getters) => {
    return getters.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  },
  calculatePercentage: (state, getters) => (value) => {
    return (getters.subTotal * value) / 100
  },
  sumAdditionals: (state, getter) => {
    if (state.additionals.length) {
      return state.additionals.reduce((total, item) => {
        if (item.mode === 'percentage') {
          return total + getter.calculatePercentage(item.value)
        }
        return total + item.value
      }, 0)
    }
  },
  Total: (state, getters) => {
    return getters.subTotal + getters.sumAdditionals
  }
}


export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1
    })
  },
  incrementItem(state, id) {
    state.items.find( item => item.id === id).quantity++
  },
  decrementItem(state, id) {
    let item = state.items.find(item => item.id === id)
    if (item.quantity > 1) {
      item.quantity--
    }
  },
  removeItem(state, id) {
    let index =  state.items.findIndex(item => item.id === id)
    state.items.splice(index, 1)
  }
}

export const actions = {
  addToCart({ commit, state }, id) {
    const found = state.items.find(item => item.id === id)
    if (found) {
      commit('incrementItem', id)
    } else {

      commit('addItem', id)
    }

  },
  increment({ commit }, id) {
    commit('incrementItem', id)
  },
  decrement({ commit }, id) {
    commit('decrementItem', id)
  },
  remove({ commit }, id) {
    commit('removeItem', id)
  },
}
