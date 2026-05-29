import { defineStore } from 'pinia'

export const useMenuFilter = defineStore('menuFilter', {

  state: () => ({
    category: 'All',
    type: 'All'
  }),
  actions: {
    setCategory(cat) {
      this.category = cat
      this.type = 'All'
    },
    setType(type) {
      this.type = type
    }
  }

})