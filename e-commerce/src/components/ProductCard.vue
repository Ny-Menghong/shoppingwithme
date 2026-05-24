<template>
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="goToDetail"
    class="relative group rounded-2xl overflow-hidden cursor-pointer"
    :class="DarkMode.isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
    style="box-shadow: 0 2px 12px rgba(0,0,0,0.08)"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-[3/4]">
      <img
        :src="hovered && product.image[1] ? product.image[1] : product.image[0]"
        :alt="product.type"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1">
        <span v-if="product.isNewIn" class="bg-black text-white text-xs px-2 py-0.5 rounded-full font-medium">New In</span>
        <span v-if="product.discount > 0" class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">-{{ product.discount }}%</span>
      </div>

      <!-- Quick Add Button -->
      <div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button
          @click.stop="addToCart"
          class="w-full py-3 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition"
        >
          + Add to Cart
        </button>
      </div>

      <!-- Wishlist -->
      <button class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition hover:scale-110">
        <i class="bi bi-heart text-gray-600 text-sm"></i>
      </button>
    </div>

    <!-- Info -->
    <div class="p-3">
      <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">{{ product.category_for }} · {{ product.type }}</p>
      <p class="text-sm font-medium truncate">{{ product.item }}</p>
      <div class="flex items-center gap-2 mt-1">
        <span v-if="product.discount > 0" class="text-gray-400 line-through text-xs">${{ product.price }}</span>
        <span class="font-bold text-sm" :class="product.discount > 0 ? 'text-red-500' : ''">
          ${{ discountedPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from '../stores/DarkMode'
import { useCart } from '../stores/useCart'

const props = defineProps({ product: Object })
const DarkMode = useDarkMode()
const cart = useCart()
const hovered = ref(false)
const router = useRouter()
const goToDetail = () => router.push(`/product/${props.product.id}`)

const discountedPrice = computed(() => {
  const p = props.product
  return p.discount > 0
    ? (p.price - (p.price * p.discount) / 100).toFixed(2)
    : p.price.toFixed(2)
})

const addToCart = () => {
  cart.addItem(props.product)
}
</script>
