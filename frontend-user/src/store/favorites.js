import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: []
  }),
  
  actions: {
    loadFromStorage() {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        this.items = JSON.parse(stored)
      }
    },
    
    saveToStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items))
    },
    
    addFavorite(product) {
      if (!this.isFavorite(product.id)) {
        this.items.push({
          ...product,
          addTime: Date.now()
        })
        this.saveToStorage()
        return true
      }
      return false
    },
    
    removeFavorite(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()
        return true
      }
      return false
    },
    
    toggleFavorite(product) {
      if (this.isFavorite(product.id)) {
        this.removeFavorite(product.id)
        return false
      } else {
        this.addFavorite(product)
        return true
      }
    },
    
    isFavorite(productId) {
      return this.items.some(item => item.id === productId)
    },
    
    clearAll() {
      this.items = []
      this.saveToStorage()
    }
  }
})
