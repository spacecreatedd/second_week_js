<template>
    <HeaderDiv/>
    <form class="register" @submit.prevent="register">
        <h1>Register</h1>
        <label>fio</label>
        <input type="text" v-model="fio" :class="{'error': fioError}" />
        <span v-if="fioError" class="error-text">{{ fioError }}</span>
        <label>email</label>
        <input type="email" v-model="email" :class="{'error': emailError}" />
        <span v-if="emailError" class="error-text">{{ emailError }}</span>
        <label>password</label>
        <input type="password" v-model="password" :class="{'error': passwordError}"/>
        <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
        <hr />
        <button type="submit">Register</button>
        
    </form>
</template>

<script>
import HeaderDiv from '../components/HeaderDiv.vue'

export default {
    displayName: 'RegisterView',
    components: {
        HeaderDiv
    },
    data() {
        return {
            fio: "",
            email: "",
            password: "",
            fioError: "",
            emailError: "",
            passwordError: "",

        };
    },
    methods: {
        validateForm() {
            this.clearErrors();
            let isValid = true;
          
            if (!this.fio) {
                this.fioError = "Please enter your fio.";
                isValid = false;
            }
            
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
            this.fioError = "";
            this.emailError = "";
            this.passwordError = "";
            
        },
        register() {
            if(this.validateForm()){
                const newUser = {
                    fio: this.fio,
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('AUTH_CREATE', newUser).then(() => this.$router.push("/")).catch(() => {console.log('failed');});
            }
        }
    }
}
</script>

<style scoped>
.register {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    margin: 0 auto;
    gap: 10px;
}

.register input,
button {
    border: 1px solid black;
    border-radius: 5px;
    height: 35px;
    font-size: 18px;
}

hr {
    margin: 10px 0;
}

.register .error {
  border-color: red;
}

.register .error-text {
  color: red;
}

</style>