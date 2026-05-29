import { defineStore } from 'pinia'
import { useSearchStore } from './SearchStore'

export const useMenuFilter = defineStore('menuFilter', {

  state: () => ({
    category: 'All',
    type: 'All'
  }),

  actions: {
    setCategory(cat) {

      const search = useSearchStore()

      if (search.search != '') {
        search.clearSearch()
      }

      this.category = cat
      this.type = 'All'
    },
    setType(type) {
      const search = useSearchStore()
      if (search.search != '') {
        search.clearSearch()
      }
      this.type = type
    }
  }

})