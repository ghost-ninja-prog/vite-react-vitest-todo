import { create } from "zustand"
import { TodoType } from "./useTodoStore"


type FavoritesStoreType = {
    favoritesTodo: TodoType[],
    addToFavorites: (todo: TodoType) => void,
    deleteFromFavorites: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStoreType>((set) => ({
    favoritesTodo: [],
    addToFavorites: (todo) => {
        set(state => ({
            favoritesTodo: [...state.favoritesTodo, todo]
        }))
    },
    deleteFromFavorites: (id) => {
        set(state => ({
            favoritesTodo: state.favoritesTodo.filter(todo => todo.id !== id)
        }))
    }
}))