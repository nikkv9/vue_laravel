<template>
    <div class="signup">
    <div class="signupContainer">
      <h2>Sign Up</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" id="name" v-model="formData.name" placeholder="name" required>
        </div>
  
        <div class="form-group">
          <input type="email" id="email" v-model="formData.email" placeholder="email" required>
        </div>
  
        <div class="form-group">
          <input type="password" id="password" v-model="formData.password" placeholder="password" required>
        </div>
  
  
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  </template>
  
  <script>
import { useUserStore } from "../stores/user";

  export default {
    name: 'signup',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
        },
        
        userStore: useUserStore(),
      };
    },
    methods: {
      async submitForm() {
      await this.userStore.signUpUser(this.formData);

      this.$router.push("/signin");
    },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .signup{
  background-color: #fff;
  height: 100vh;
  padding-top: 10rem;

}
.signupContainer {
  margin: 0 auto;
  width: 30rem;
  padding: 2rem;
  box-shadow: 0 0 .2rem rgb(0, 0, 0,.3);
}
.signupContainer h2{
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
  </style>
  