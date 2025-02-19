import { waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { server } from '../mocks/node'

import { TodoType, useTodoStore } from "../store/useTodoStore";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

const mockTodos: TodoType[] = [
    {
        id: 1,
        userId: 1,
        completed: false,
        title: 'first todo'
    },
    {
        id: 2,
        userId: 1,
        completed: true,
        title: 'second todo'
    }
]

describe('useTodosStore tests', () => {

    test('fetch todos', async () => {        
        const state = useTodoStore.getState()      
        await waitFor(() => state.fetchTodos()) 
        const newState = await waitFor(() =>  useTodoStore.getState())
        expect(newState.todos).toHaveLength(20)
    })

    test('delete todo', async () => {
        
        useTodoStore.setState({todos: mockTodos})
        const state = useTodoStore.getState()
        await waitFor(() => state.deleteTodo(1))
        const newState = useTodoStore.getState()
        expect(newState.todos).toHaveLength(1)
    })

    test('update todo', async () => {
        useTodoStore.setState({todos: mockTodos})
        const state = useTodoStore.getState()
        const updateTodo: TodoType = {
            completed: true,
            id: 1,
            userId: 1,
            title: 'edited title'
        }  
        await waitFor(() => state.updateTodo(updateTodo))
        const newState = useTodoStore.getState()
        expect(newState.todos[0].completed).toBeTruthy()
        expect(newState.todos[0].title).toBe('edited title')
    })

    test('created todo', async () => {
        const todo: Omit<TodoType, "id" | "favorites"> = {
            completed: false,
            title: 'created todo title',
            userId: 1
        }
        const state = useTodoStore.getState()
        await waitFor(() => state.createTodo(todo))
        const newState = useTodoStore.getState()
        const createdTodo = newState.todos[0]
        expect(createdTodo.title).toBe('created todo title')
        expect(createdTodo.completed).toBeFalsy()
        expect(createdTodo.id).toBe(201)
    })
})