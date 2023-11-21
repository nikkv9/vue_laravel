<template>
    <div class="header">
        <div class="left"><h3>Vuex</h3></div>
        <div class="right">
            <router-link to="/signup" class="link">
            SIGNUP
        </router-link>

            <router-link to="/signin" class="link">
            SIGNIN
        </router-link>

        <button  @click="logout">LOGOUT </button>

            <router-link to="/wlcm" class="link">
            WELCOME
        </router-link>
        
            <router-link to="/users" class="link">
            USERS
        </router-link>
        </div>

    </div>
</template>

<script>
import {useUserStore} from '../../stores/user';
    export default {
        name:'header',

        methods:{
            async logout(){
                const userStore = useUserStore();
      userStore.clearUser(); // Clear user data in the Pinia store
      this.$router.push('/signin'); 
            }
        }
    }
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid rgb(0, 0, 0,.2);
    padding: 1rem 0;
}
.right{
    display: flex;
    gap: 1rem;
    margin-right: 2rem;
}
.right *{
    color: black;
}

// router-link-active is inbuilt feature of vue-router
.right .link.router-link-active{
    color: crimson;
}
.left{
    margin-left: 2rem;
}
</style>