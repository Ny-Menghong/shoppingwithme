// stores/auth.js

import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from 'vue-toastification'
export const useAuth = defineStore("auth", () => {

    const toast = useToast();
    const router = useRouter();
  // LOGIN STATUS
  const isLogin = ref(
    localStorage.getItem("status") === "true"
  )
  // USER INFO
  const userInfo = ref({
    name: localStorage.getItem("name") || "Guse User",
    email: localStorage.getItem("email") || "guse@gmail.com",
    password: localStorage.getItem("password") || "vbbvo",
  })
  // REGISTER
  const register = (name, email, password) => {
    // UPDATE STATE
    userInfo.value = {name,email,password}
    // SAVE LOCAL STORAGE
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)
    router.push('/login')
      // Success Toast
    toast.success('Register Successfully', {
    timeout: 2000,
    position: 'bottom-right',
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true
  })
    
  }
  // LOGIN
  const login = (email, password) => {
    // CHECK EMAIL
    if (email !== userInfo.value.email) {
      alert("Wrong email")
      return
    }
    // CHECK PASSWORD
    if (password !== userInfo.value.password) {
      alert("Wrong password")
      return
    }
    // LOGIN SUCCESS
    isLogin.value = true
    localStorage.setItem("status", "true")
    router.push('/')
      // Success Toast
    toast.success('Login Successfully . Enjoy your shoping.', {
    timeout: 2000,
    position: 'bottom-right',
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true
  })
    
  }

  // LOGOUT
  const logout = () => {
    isLogin.value = false
    localStorage.removeItem("status")

    router.push('/')
    toast.success('Logout Successfully .', {
        timeout: 2000,
        position: 'bottom-right',
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true
    })
  }
  return {
    isLogin,
    userInfo,
    register,
    login,
    logout
  }
})