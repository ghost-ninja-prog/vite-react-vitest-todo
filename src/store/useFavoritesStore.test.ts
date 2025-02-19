import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest"
import { server } from "../mocks/node"
import { TodoType } from "./useTodoStore"
import { useFavoritesStore } from "./useFavoritesStore"



// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

const mockTodo: TodoType = {
    completed: false,
    id: 1,
    title: 'test todo title',
    userId: 1,
    favorites: true
}

describe('Test useFavoritesStore', () => {
    test('test addToFavorites', () => {
        const state = useFavoritesStore.getState()
        state.addToFavorites(mockTodo)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTodo[0]).toEqual(mockTodo)

    })

    test('test deleteFromFavorites', () => {
        useFavoritesStore.setState({ favoritesTodo: [{ ...mockTodo }] })
        const state = useFavoritesStore.getState()
        expect(state.favoritesTodo).toHaveLength(1)
        state.deleteFromFavorites(1)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTodo).toHaveLength(0)
    })

    test('test updateFavoritesTodo', () => {
        const updateTodo: TodoType = {
            completed: true,
            id: 1,
            title: 'Edited test todo title',
            userId: 1,
            favorites: true
        }

        useFavoritesStore.setState({ favoritesTodo: [{ ...mockTodo }] })
        const state = useFavoritesStore.getState()
        state.updateFavoritesTodo(updateTodo)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTodo[0].title).toBe('Edited test todo title')
        expect(newState.favoritesTodo[0].completed).toBeTruthy()
    })
})