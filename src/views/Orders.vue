<template>
  <HeaderDiv />
  <div>
    <h1 v-if="orders.length <= 0">No Orders In Order</h1>
    <h1 v-else>Your Orders:</h1>
    <ul>
      <li class="order" v-for="order in orders" :key="order.id">
        <div class="upper-text">
          <p>Order ID: {{ order.id }}</p>
          <p>Products: </p>
        </div>
        <div class="main-text">
          <p v-for="product in products">
            {{product.name }}
          </p>
        </div>
        <p class="bottom-text">Price - {{ order.order_price }}$</p>
      </li>
    </ul>
  </div>
</template>

<script>

import HeaderDiv from '../components/HeaderDiv.vue'

export default {
  displayName: 'Orders',
  components: {
    HeaderDiv
  },
  data() {
    return {
      orders: [],
      products: []
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    
    fetchOrders() {
      this.$store.dispatch('GET_PRODUCTS')
      const token = localStorage.getItem('myAppToken');
      fetch('https://jurapro.bhuser.ru/api-shop/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.orders = data.data;
          this.getProductNames()
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    },
    getProductNames() {
      for (let i = 0; i < this.orders.length; i++) {
        let allOrderIds = this.orders[i].products
        this.$store.getters.products.forEach(element => {
          for(let i = 0 ; i < allOrderIds.length ; i++){
            if(element.id == allOrderIds[i]){this.products.push(element)} 
          }
        });
      }
    }
  },
}

</script>

<style scoped>
  .order{
    list-style-type: none;
    width: 40%;
    margin: 15px auto;
  }
  .upper-text{
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;
  }

</style>