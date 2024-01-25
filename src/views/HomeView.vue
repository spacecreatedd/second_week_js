<template>
  <HeaderDiv/>
  <div class="catalog-grid">
    <div class="catalog-item" v-for="product in products" :key="product.id">
      <h3 class="product_name">{{ product.name }}</h3>
      <p class="product_text">{{ product.description }}</p>
      <div class="product_bottom">
        <p class="product_price">{{ product.price }}$</p>
        <button class="product_btn" v-show="userAuthed" @click="addToCart(product.id)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDiv from '../components/HeaderDiv.vue'
export default {
  displayName: 'Catalog',
  components: {
    HeaderDiv
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
    userAuthed() {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS')
  },
  methods: {
    addToCart(productId){
      this.$store.dispatch('ADD_CARD_ITEM',productId).catch(()=>{console.log('addcart error');})
    },
  }
}
</script>

<style scoped>
.catalog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.catalog-item {
  width: 50%;
  text-align: center;
  margin: 0 auto;
}
.product_btn{
  height: 40px;
  width: 75px;
  font-size: 17px;
  background: #047275;
  border: 0;
  border-radius: 10px;
  color: #fff;
}
.product_bottom{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
</style>