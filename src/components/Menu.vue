<template>
  <nav class="  px-8 py-4">
    
    <div class="flex space-x-10">

      <!-- MAIN MENU --><div v-for="cat in categories" :key="cat" class="relative group">
      

        <!-- Menu Button -->
        <button class="relative text-lg font-medium pb-1" @click="setCategory(cat)">
          {{ cat }}
          <!-- Hover Line -->
          <span class="absolute left-0 bottom-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useMenuFilter } from '../stores/MenuFilter';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { products } from '../data/products';

const useMenu = useMenuFilter();
const router = useRouter();

const categories = computed(() => ['All', ...new Set(products.map(p => p.category_for))])

const setCategory = (cat) => {
  // បោះ data ទៅ state
  useMenu.menu = cat;
  router.push("/shop");
  console.log(useMenu.menu)
}
</script>