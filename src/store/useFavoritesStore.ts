import { create } from "zustand"
import { TodoType } from "./useTodoStore"
import { persist } from "zustand/middleware"


type FavoritesStoreType = {
    favoritesTodo: TodoType[],
    addToFavorites: (todo: TodoType) => void,
    deleteFromFavorites: (id: number) => void,
    updateFavoritesTodo: (todo: TodoType) => void
}

export const useFavoritesStore = create<FavoritesStoreType>()(
    persist(
        (set, get) => ({
            favoritesTodo: [],
            addToFavorites: (newTodo) => {
                const idx = get().favoritesTodo.findIndex(todo => todo.id === newTodo.id)
                if(idx !== -1) {
                    return
                }
                set(state => ({
                    favoritesTodo: [...state.favoritesTodo, newTodo]
                }))
            },
            deleteFromFavorites: (id) => {
                set(state => ({
                    favoritesTodo: state.favoritesTodo.filter(todo => todo.id !== id)
                }))
            },
            updateFavoritesTodo: (todo) => {
                set(state => ({
                    favoritesTodo: state.favoritesTodo.map(t => t.id === todo.id ? todo : t)
                }))
            }
        }),
        { 
            name: 'favorites-storage'
        }
    )
)