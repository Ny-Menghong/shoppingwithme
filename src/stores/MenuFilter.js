// stores/MenuFilter.js

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuFilter = defineStore('menuFilter', () => {

  // MENU STATE
  const menu = ref('All')

  // SUBMITTED MENU
  const submittedMenu = ref('All')

  // SUBMIT MENU
  const submitMenu = () => {
    submittedMenu.value = menu.value

    console.log(
      '[MenuFilter] submitted:',
      submittedMenu.value
    )
  }

  // CLEAR MENU
  const clearMenu = () => {
    menu.value = 'All'
    submittedMenu.value = 'All'
  }

  return {
    menu,
    submittedMenu,
    submitMenu,
    clearMenu
  }
})