<template>
  <aside class="w-full">
    <div :class="DarkMode.isDark ? 'bg-gray-800' : ''" class="p-5 sticky top-24">
      <h3 class="font-semibold mb-4">Filters</h3>
      <!-- Category -->
      <div class="mb-5">
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Category
        </p>
        <div class="space-y-1">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCat = cat"
            class="block text-lg w-full text-left hover:pe-1.5 px-3 py-1.5 rounded-lg transition"
            :class="
              selectedCat === cat
                ? 'bg-black text-white'
                : DarkMode.isDark
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
            "
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Type -->
      <div class="mb-5">
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Type</p>
        <div class="space-y-1">
          <button
            v-for="t in types"
            :key="t"
            @click="selectedType = t"
            class="block w-full text-left text-sm px-3 py-1.5 rounded-lg transition"
            :class="
              selectedType === t
                ? 'bg-black text-white'
                : DarkMode.isDark
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
            "
          >
            {{ t }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useSearchStore } from "../stores/SearchStore";
import { useDarkMode } from "../stores/DarkMode";
import { computed, ref } from "vue";
import { products } from "../data/products";
import { useMenuFilter } from "../stores/MenuFilter";

const selectedType = ref("All");
const useMenu = useMenuFilter();
const DarkMode = useDarkMode();
const selectedCat = ref("All");

const categories = computed(() => [
  "All",
  ...new Set(products.map((p) => p.category_for)),
]);
const types = computed(() => {
  const pool =
    selectedCat.value === "All"
      ? products
      : products.filter((p) => p.category_for === selectedCat.value);
  return ["All", ...new Set(pool.map((p) => p.type))];
});
</script>

<style></style>
