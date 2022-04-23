<template>
  <v-row>
    <v-col cols="12">
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, i) in cartItems" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Rp.{{ currency(item.price) }}
              <v-btn
                icon
                class="px-0"
                x-small
                color="error"
                @click="decrement(item.id)"
                ><v-icon>mdi-chevron-double-down</v-icon>
              </v-btn>
              x{{ item.quantity }}
              <v-btn
                icon
                class="px-0"
                x-small
                color="success"
                @click="increment(item.id)"
                ><v-icon>mdi-chevron-double-up</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>
              <v-btn icon class="px-0" color="error" @click="remove(item.id)"
                ><v-icon>mdi-trash-can</v-icon>
              </v-btn>
              Rp.{{ currency(itemTotal(item.price, item.quantity)) }}
            </v-list-item-title>
          </v-list-item-action>
        </v-list-item>

        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black-text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title> Sub Total </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action> Rp.{{ currency(subTotal) }} </v-list-item-action>
        </v-list-item>

        <v-list-group
          v-if="cartItems.length"
          :value="false"
          class="text-h6 black-text grey lighten-2"
        >
          <template v-slot:activator>
            <v-list-item-content class="text-h6">
              <v-list-item-title>Additionals</v-list-item-title>
            </v-list-item-content>
          </template>

          <template v-for="(additional, i) in additionals">
            <v-list-item :key="i">
              <v-list-item-content>
                <v-list-item-title> {{ additional.title }} </v-list-item-title>
                <v-list-item-subtitle v-if="additional.mode == 'percentage'">
                  Pengenaan pajak sebesar {{ currency(additional.value) }}%
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title v-if="additional.mode == 'fix'">
                  Rp.{{ currency(additional.value) }}
                </v-list-item-title>
                <v-list-item-title v-else-if="additional.mode == 'percentage'">
                  Rp.{{ currency(calculatePercentage(additional.value)) }}
                </v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>

        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black-text green lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title> Total </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action> Rp.{{ currency(Total) }} </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('carts', {
      increment: 'increment',
      decrement: 'decrement',
      remove: 'remove',
    }),
    //formnat currency
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
      additionals: 'additionals',
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems',
      itemTotal: 'itemTotal',
      subTotal: 'subTotal',
      calculatePercentage: 'calculatePercentage',
      Total: 'Total',
    }),
  },
}
</script>
