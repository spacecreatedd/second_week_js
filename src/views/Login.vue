<template>
    <HeaderDiv/>
    <form class="login" @submit.prevent="login">
        <h1>Sign in</h1>
        <label>email</label>
        <input type="email" v-model="email" :class="{'error': emailError}"/>
        <span v-if="emailError" class="error-text">{{ emailError }}</span>
        <label>password</label>
        <input type="password" v-model="password" :class="{'error': passwordError}"/>
        <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
        <hr />
        <button class="login-btn" type="submit">Login</button>
        <span v-if="authError" class="error-text">Wrong password or email</span>
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
.login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    margin: 0 auto;
    gap: 10px;
}

.login input,
button {
    border: 1px solid black;
    border-radius: 5px;
    height: 35px;
    font-size: 18px;
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