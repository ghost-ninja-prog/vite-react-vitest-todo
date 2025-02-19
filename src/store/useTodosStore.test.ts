import { waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { server } from '../mocks/node'

import { useTodoStore } from "../store/useTodoStore";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())



describe('useTodosStore tests', () => {

    test('fetch todos', async () => {
        
        const state = useTodoStore.getState()
        
        await waitFor(() => state.fetchTodos()) 

        const newState = await waitFor(() =>  useTodoStore.getState() )
        
        expect(newState.todos).toHaveLength(10)
    })
})