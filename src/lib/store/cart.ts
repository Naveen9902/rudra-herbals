import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string // product id
  cartItemId: string // unique identifier for the cart item (id + variantName)
  name: string
  price: number
  potency: string
  quantity: number
  image?: string
  variantName?: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity' | 'cartItemId'> & { quantity?: number }) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const cartItemId = `${newItem.id}-${newItem.variantName || 'default'}`
          const existingItem = state.items.find((i) => i.cartItemId === cartItemId)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? { ...i, quantity: i.quantity + (newItem.quantity || 1) }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { ...newItem, cartItemId, quantity: newItem.quantity || 1 }],
          }
        })
      },
      
      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }))
      },
      
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          items: state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'rudra-herbals-cart',
    }
  )
)
