<template>
  <div :class="DarkMode.isDark ? 'bg-gray-950 text-white min-h-screen' : 'bg-gray-50 text-black min-h-screen'">

    <div v-if="product" class="max-w-6xl mx-auto px-4 py-10">
      <div class="grid md:grid-cols-2 gap-10">

        <!-- Images -->
        <div class="flex gap-2">
          <div class="flex flex-col gap-2 overflow-x-auto pb-1">
            <img
              v-for="(img, i) in product.image"
              :key="i"
              :src="img"
              @click="activeImage = img"
              class="w-16 h-20 object-cover rounded-xl cursor-pointer border-2 transition flex-shrink-0"
              :class="activeImage === img ? 'border-black' : 'border-transparent'"
            />
          </div>

          <div class="rounded-2xl overflow-hidden aspect-[3/4] mb-3">
            <img :src="activeImage" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Info -->
        <div class="py-4">
          <p class="text-sm text-gray-400 uppercase tracking-widest mb-2">
            {{ product.category_for }} / {{ product.item }} / {{ product.type }}
          </p>

          <h1 class="text-2xl font-bold mb-4">
            {{ product.type }} — {{ product.category_for }}
          </h1>

          <!-- Price -->
          <div class="flex items-center gap-3 mb-6">
            <span
              v-if="product.discount > 0"
              class="text-gray-400 line-through text-lg"
            >
              ${{ product.price }}
            </span>

            <span
              class="text-3xl font-bold"
              :class="product.discount > 0 ? 'text-red-500' : ''"
            >
              ${{ discountedPrice }}
            </span>

            <span
              v-if="product.discount > 0"
              class="bg-red-100 text-red-500 text-sm px-2 py-0.5 rounded-full"
            >
              -{{ product.discount }}%
            </span>
          </div>

          <p class="text-sm text-gray-500 leading-relaxed mb-6">
            {{ product.discription }}
          </p>

          <!-- Size -->
          <div class="mb-6">
            <p class="text-sm font-semibold mb-2">Size</p>
            <div class="flex gap-2">
              <button
                v-for="s in ['XS','S','M','L','XL']"
                :key="s"
                @click="selectedSize = s"
                class="px-4 py-2 border rounded-lg text-sm transition"
                :class="selectedSize === s
                  ? 'bg-black text-white border-black'
                  : DarkMode.isDark
                    ? 'border-gray-600 hover:border-gray-400'
                    : 'border-gray-300 hover:border-black'"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="flex items-center gap-3 mb-6">
            <p class="text-sm font-semibold">Qty:</p>

            <div
              class="flex items-center border rounded-lg overflow-hidden"
              :class="DarkMode.isDark ? 'border-gray-600' : 'border-gray-200'"
            >
              <button
                @click="qty > 1 && qty--"
                class="px-4 py-2 text-lg hover:bg-gray-100 hover:text-black transition"
              >
                −
              </button>

              <span class="px-4 text-sm font-medium">{{ qty }}</span>

              <button
                @click="qty++"
                class="px-4 py-2 text-lg hover:bg-gray-100 hover:text-black transition"
              >
                +
              </button>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              @click="handleAdd"
              class="flex-1 bg-gray-700 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button
              class="w-14 h-14 border rounded-xl flex items-center justify-center hover:border-red-400 hover:text-red-400 transition"
              :class="DarkMode.isDark ? 'border-gray-600' : 'border-gray-300'"
            >
              <i class="bi bi-heart text-lg"></i>
            </button>
          </div>

          <p v-if="added" class="text-green-500 text-sm mt-3 flex items-center gap-1">
            <i class="bi bi-check-circle"></i> Added to cart!
          </p>
        </div>
      </div>
      <!-- Similar Products -->
      <!-- Similar Products (Horizontal Scroll) -->
      <h1 class="text-xl font-bold mt-12 mb-4">Similar Items</h1>
      <div class="overflow-x-auto">
        <div class="flex gap-4 pb-4 w-max">
          <div
            v-for="item in similarProducts"
            :key="item.id"
            class="min-w-[180px] rounded-xl p-2 flex-shrink-0 snap-start transition-all duration-300 ease-in-out
             hover:shadow-xl hover:-translate-y-1 hover:border-gray-400 cursor-pointer"
            @click="goToProduct(item.id)"
          >
            <img
              :src="item.image[0]"
              class="rounded-lg w-full h-55 object-cover"
            />
            <p class="text-sm mt-2 font-medium">
              {{ item.name }}
            </p>
            <p class="text-xs text-gray-500">
              ${{ item.price }}
            </p>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="text-center py-24 text-gray-400">
      Product not found.
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Footer from '../components/Footer.vue'
import { products } from '../data/products'
import { useCart } from '../stores/useCart'
import { useDarkMode } from '../stores/DarkMode'
import { useToast } from 'vue-toastification'
import { useAuth } from '../stores/auth'

const route = useRoute()
const router = useRouter()

const DarkMode = useDarkMode()
const cart = useCart()
const toast = useToast()
const auth = useAuth()

// Product
const product = computed(() =>
  products.find(p => p.id === Number(route.params.id))
)

// Reactive image
const activeImage = ref('')

// Reset image when product changes
watch(product, (newVal) => {
  if (newVal?.image?.length) {
    activeImage.value = newVal.image[0]
  }
}, { immediate: true })

// Similar products (FIXED)
const similarProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p =>
    p.id !== product.value.id &&
    p.type === product.value.type &&
    p.category_for === product.value.category_for
  )
})

const qty = ref(1)
const selectedSize = ref('M')
const added = ref(false)

// Discount price
const discountedPrice = computed(() => {
  if (!product.value) return 0

  const p = product.value
  const price =
    p.discount > 0
      ? p.price - (p.price * p.discount) / 100
      : p.price

  return price.toFixed(2)
})
const handleSimilarProduct=()=>{
  router.push("/detail/")
}

// Add to cart
const handleAdd = () => {
  if (!auth.isLogin) {
    toast.error('Please create an account first.', {
      timeout: 2000,
      position: 'bottom-right',
      onClick() {
        router.push('/register')
      }
    })
    return
  }

  for (let i = 0; i < qty.value; i++) {
    cart.addItem({
      ...product.value,
      size: selectedSize.value
    })
  }

  added.value = true
  setTimeout(() => (added.value = false), 2000)

  toast.success(`${product.value.item} added to cart 🛒`, {
    timeout: 2000,
    position: 'bottom-right'
  })
}
const goToProduct = (id) => {
  setTimeout(() => {
    router.push(`/product/${id}`)
  }, 150)
}
</script>