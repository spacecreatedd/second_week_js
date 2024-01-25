<template>
    <HeaderDiv />
    <h1 v-show="groupedCarts.length <= 0">No Items in Cart</h1>
    <div class="cart-item" v-for="cart in groupedCarts" :key="cart.id">
        <div class="cart-text">
            <h3 class="cart-item-text">{{ cart.name }}</h3>
            <p class="cart-item-desc">{{ cart.description }}</p>
            <p class="cart-item-price"><span class="price-text">Price</span> - {{ cart.price }}$</p>
        </div>
        <div class="cart-btn">
            <div class="quantity-btn">
                <button class="cart-btn-item cart-btn" @click="decreaseQuantity(cart.id)">-</button>
                <span class="cart-btn-item">{{ cart.quantity }}</span>
                <button class="cart-btn-item cart-btn" @click="increaseQuantity(cart.product_id)">+</button>
            </div>
            <button class="cart-btn-delete" @click="removeItem(cart)">DELETE</button>
        </div>
    </div>
    <button class="order-btn" v-show="groupedCarts.length > 0" @click="placeOrder">ORDER</button>
</template>

<script>
import HeaderDiv from '../components/HeaderDiv.vue'

export default {
    displayName: 'Cart',
    components: {
        HeaderDiv
    },
    computed: {
        groupedCarts() {
            let state = this.$store.getters.carts;
            const grouped = {};
            state.forEach(item => {
                if (!grouped[item.product_id]) {
                    grouped[item.product_id] = { ...item, quantity: 0 };
                }
                grouped[item.product_id].quantity += 1;
            });
            return Object.values(grouped);
        }
    },
    mounted() {
        this.$store.dispatch('GET_CARD_DATAS')
    },
    methods: {
        //  сделать так чтобы после того как пропушался order удалить все с carts
        placeOrder() {
            console.log(this.$store.getters.carts)
            this.$store.dispatch('PLACE_ORDER').then(() => this.$router.push('/order'))
        },
        removeItem(itemId) {
            let arrayOfCarts = this.$store.getters.carts.filter((obj) => obj.product_id === itemId.product_id)
            for (let i = 0; i < arrayOfCarts.length; i++) {

                this.$store.dispatch('REMOVE_CARD_ITEM', arrayOfCarts[i].id)
            }
            this.$store.dispatch('GET_CARD_DATAS')
        },
        decreaseQuantity(itemId) {
            this.$store.dispatch('REMOVE_CARD_ITEM', itemId).then(() => { this.$store.dispatch('GET_CARD_DATAS') })
        },
        increaseQuantity(itemId) {
            this.$store.dispatch('ADD_CARD_ITEM', itemId).then(() => { this.$store.dispatch('GET_CARD_DATAS') })
        }
    }
}

</script>

<style scoped>
.price-text {
    color: #00b928;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    padding: 25px 0;
}

.cart-text {
    width: 500px;
}

.cart-btn {
    display: flex;
    flex-direction: column;
}

.cart-btn-item {
    width: 33%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.quantity-btn {
    display: flex;
    align-items: center;
}

.cart-btn-delete {
    margin-top: 10px;
    width: 100px;
    height: 40px;
    font-size: 13px;
    border-radius: 10px;
    border: 0;
}

.cart-btn {
    border: 0;
    border-radius: 10px;
}

.order-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    font-size: 30px;
    border: 0;
    background: #8f8e8e;
}</style>