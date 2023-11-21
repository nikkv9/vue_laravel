import { useUserStore } from '../stores/user'; 

export const userProtected = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.user) {   
    next();
  } else {
    next('/signin');
  }
}

export const adminProtected = (to, from, next) => {
  const userStore = useUserStore();
  console.log(userStore.user)
  if (userStore.user) {
    if (userStore.user.role==='admin') {
    next();
  }
 } else {
    next('/signin');
  }
}
