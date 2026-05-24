<template>
  <div :class="DarkMode.isDark ? 'bg-gray-950 text-white min-h-screen' : 'bg-gray-50 text-black min-h-screen'">
    <Navbar />

    <div class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>

      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Form -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Shipping -->
          <div :class="DarkMode.isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-2xl p-6 shadow-sm">
            <h2 class="font-semibold text-lg mb-4">Shipping Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input type="text" placeholder="John" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" placeholder="Doe" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" placeholder="you@example.com" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium mb-1">Address</label>
                <input type="text" placeholder="123 Main St" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <input type="text" placeholder="City" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">ZIP Code</label>
                <input type="text" placeholder="00000" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div :class="DarkMode.isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-2xl p-6 shadow-sm">
            <h2 class="font-semibold text-lg mb-4">Payment</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" maxlength="19" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                  :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Expiry</label>
                  <input type="text" placeholder="MM / YY" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                    :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">CVV</label>
                  <input type="text" placeholder="123" maxlength="4" class="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
                    :class="DarkMode.isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Review -->
        <div class="lg:col-span-2">
          <div :class="DarkMode.isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 class="font-semibold mb-4">Order Review</h2>
            <div class="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              <div v-for="item in cart.items" :key="item.id" class="flex gap-3 items-center">
                <img :src="item.image[0]" class="w-12 h-14 object-cover rounded-lg flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">{{ item.type }}</p>
                  <p class="text-xs text-gray-400">Qty: {{ item.quantity }}</p>
                </div>
                <span class="text-sm font-semibold">${{ ((item.discount > 0 ? item.price - item.price * item.discount / 100 : item.price) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <div class="border-t pt-4 space-y-2 text-sm" :class="DarkMode.isDark ? 'border-gray-600' : 'border-gray-200'">
              <div class="flex justify-between"><span class="text-gray-400">Subtotal</span><span>${{ cart.totalPrice.toFixed(2) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">Shipping</span><span class="text-green-500">Free</span></div>
              <div class="flex justify-between font-bold text-base pt-1">
                <span>Total</span><span>${{ cart.totalPrice.toFixed(2) }}</span>
              </div>
            </div>
            <button @click="placeOrder" class="w-full mt-5 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useCart } from '../stores/useCart'
import { useDarkMode } from '../stores/DarkMode'

const DarkMode = useDarkMode()
const cart = useCart()
const router = useRouter()

const placeOrder = () => {
  alert('Order placed! Thank you for shopping with us.')
  cart.clearCart()
  router.push('/')
}
</script>
