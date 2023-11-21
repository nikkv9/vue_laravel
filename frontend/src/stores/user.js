// userStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    loading:false,
    err:null,
    success:null,
  }),
  getters:{

  },
  actions: {
    setUser(user) {
      this.user = user;
      Cookies.set('userData', JSON.stringify(user), { expires: 1 / 12 });
    },

    getUser() {
      const storedUserData = Cookies.get('userData');
      if (storedUserData) {
        this.user = JSON.parse(storedUserData);
      }
    },

 
    clearUser() {
      this.user = null;
      Cookies.remove('userData');
      Cookies.remove('tokenId');
    },


    async signInUser(formData) {
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/signin",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        // console.log(res.data)

        // Set the user in the store
        this.setUser(res.data.user);

        // expires : 5 mins, for 1 day just put expires: 1
        Cookies.set('tokenId', res.data.tokenId, { expires: 1 / 12 });
        
      } catch (error) {
        throw error; 
      }
    },

    async signUpUser(formData) {
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        console.log(res)
      } catch (error) {
        throw error; 
      }
    },

    checkToken() {
      const tokenId = Cookies.get('tokenId');
      if (tokenId) {
        try {
          const tokenPayload = jwtDecode(tokenId);
          // console.log(tokenPayload)

          const isTokenExpired = tokenPayload.exp < Date.now() / 1000;

          if (isTokenExpired) {
            this.clearUser();
            window.location.href = '/signin';
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    },

  },
});
