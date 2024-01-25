<template>
    <HeaderDiv/>
    <form class="login" @submit.prevent="login">
        <h1>Авторизация</h1>
        <label>Электронная почта</label>
        <input type="email" v-model="email" :class="{'error': emailError}"/>
        <span v-if="emailError" class="error-text">{{ emailError }}</span>
        <label>Пароль</label>
        <input type="password" v-model="password" :class="{'error': passwordError}"/>
        <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
        <hr />
        <button class="login-btn" type="submit">Войти</button>
        <span v-if="authError" class="error-text">Неправильный пароль или почта!</span>
    </form>
</template>

<script>
import HeaderDiv from '../components/HeaderDiv.vue'

export default {
    displayName: 'LoginView',
    components:{
        HeaderDiv
    },
    data() {
        return {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
            authError: "",
        };
    },
    methods: {
        validateForm() {
            this.clearErrors();
            let isValid = true;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email || !emailPattern.test(this.email)) {
                this.emailError = "Please enter a valid email address.";
                isValid = false;
            }
            
            if (!this.password && this.password < 8) {
                this.passwordError = "Please enter a password.";
                isValid = false;
            }
            
            return isValid;
        },
        clearErrors() {
            this.emailError = "";
            this.passwordError = "";
            this.authError = "";
        },
        login() {
            if(this.validateForm()){
                const newUser = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('AUTH_REQUEST', newUser).then(() => this.$router.push("/")).catch(()=>{console.log('error');this.authError= true});
            }
        }
    }
}
</script>

<style scoped>
*{
    font-family: 'Montserrat', sans-serif;
}
.login {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 10px;
    margin: 10% auto;
    gap: 10px;
}

.login input, button {
    border: 1px solid black;
    border-radius: 5px;
    height: 35px;
    font-size: 18px;
}
.login-btn{
    background:black;
    color:white;
    transition: .2s linear;
}
.login-btn:hover{
    color:#0c7075;
}
hr {
    margin: 10px 0;
}

.login .error {
  border-color: red;
}

.login .error-text {
  color: red;
}
</style>