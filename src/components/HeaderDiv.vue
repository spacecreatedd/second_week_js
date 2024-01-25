<template>
    <div class="header">
        <router-link class="header_link" to="/">Главная</router-link>
        <router-link class="header_link" v-show="!userAuthed" to="/login">Логин</router-link>
        <router-link class="header_link" v-show="!userAuthed" to="/register">Регистрация</router-link>
        <router-link class="header_link" v-show="userAuthed" to="/cart">Корзина</router-link>
        <router-link class="header_link" v-show="userAuthed" to="/order">Заказы</router-link>
        <button class="logout_btn" v-show="userAuthed" @click="logout">Выйти</button>
    </div>
</template>

<script>
export default{
    name: 'HeaderDiv',
    computed: {
        userAuthed() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/')).catch((error) => {
                console.error('Logout failed:', error);
            });
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap');
.header{
    font-family: 'Montserrat', sans-serif;
    background: #05161a;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content:space-around;
}
.header_link{
    color: #fff;
    text-decoration: none;
    font-size: 25px;
    font-weight:bold;
    transition: .2s linear;
}
.header_link:hover{
    color:#0c7075;
}
.logout_btn{
    font-family: 'Montserrat', sans-serif;
    padding:5px 10px;
    font-size: 20px;
    background: #fff;
    border: 0;
    border-radius: 10px;
    color: #000;
    font-weight:bold;
}
</style>