<template>
  <div :class="DarkMode.isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'" class="min-h-screen flex items-center justify-center px-4 py-10">
    <div :class="DarkMode.isDark ? 'bg-gray-800' : 'bg-white'" class="w-full max-w-md rounded-2xl shadow-lg p-8">
      <router-link to="/" class="text-blue-500 hover:underline mb-xl-4"> <i class="bi bi-arrow-bar-left"></i> Back to Home</router-link> 
      <h1 class="text-2xl font-bold mb-1">Create an account</h1>
      <p class="text-sm text-gray-400 mb-6">Join us and start shopping</p>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">First Name</label>
            <input v-model="form.firstName" type="text" placeholder="John"
              class="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
              :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Last Name</label>
            <input v-model="form.lastName" type="text" placeholder="Doe"
              class="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
              :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" placeholder="you@example.com"
            class="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
            :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••"
            class="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
            :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'"
          />
        </div>
        <label class="flex items-start gap-2 text-sm cursor-pointer">
          <input type="checkbox" v-model="form.agree" class="accent-black mt-0.5" />
          <span class="text-gray-400">I agree to the <a href="#" class="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a></span>
        </label>

        <button class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
          Create Account
        </button>
      </div>

      <p class="text-center text-sm text-gray-400 mt-6">
        Already have an account?
        <RouterLink to="/login" class="text-blue-500 hover:underline">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useDarkMode } from '../stores/DarkMode'

const DarkMode = useDarkMode()
const form = ref({ firstName: '', lastName: '', email: '', password: '', agree: false })
</script>
