import { create } from "zustand"

// const BASE_URL = 'http://localhost:3000/todos'
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'


export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
    favorites?: boolean
}

type StoreType = {
    todos: TodoType[],
    loading: boolean,
    currentPage: number,
    totalPage: number,
    fetchTodos: (quantity?: number) => void,
    deleteTodo: (id: number) => void,
    updateTodo: (todo: TodoType) => void,
    createTodo: (todo: Omit<TodoType, 'id'>) => void,
    changeCurrentPage: (page: number) => void,
    loadMorePosts: (page: number) => void
}

export const useTodoStore = create<StoreType>((set, get) => ({
    todos: [],
    loading: false,
    currentPage: 1,
    totalPage: 3,
    fetchTodos: async (page = 1) => {
        try{
            if (get().loading) return
    
            set({ loading: true })
    
            const response = await fetch(`${BASE_URL}?_page=${page}`)

            if(response.status !== 200) {
                throw new Error(`Error fetch data, ${response.status}: ${response.statusText}`)
            }
            const resArray: TodoType[] = await response.json()
    
            set((state) => ({
                todos: [...state.todos].concat(resArray),
                loading: false,
            }))
        } catch(error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    },
    deleteTodo: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            })
            if (response.status !== 200) {
                throw new Error(`Error delete todo, ${response.status}: ${response.statusText}`)
            }
            // const delTodo: TodoType = await response.json()
            // console.log(delTodo)
            // set(state => ({
            //     todos: state.todos.filter(todo => todo.id !== delTodo.id)
            // }))

            set(state => ({
                todos: state.todos.filter(todo => todo.id !== id)
            }))

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }

    },
    updateTodo: async (todo) => {
        try {
            const response = await fetch(`${BASE_URL}/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            if (response.status !== 200) {
                throw new Error(`Error updated todo: ${response.status} ${response.statusText}`)
            }
            const updTodo: TodoType = await response.json()
            set(state => ({
                todos: state.todos.map(todo => todo.id === updTodo.id ? updTodo : todo)
            }))
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    },
    createTodo: async (todo) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            if(response.status !== 201) {
                throw new Error(`Error created todo: ${response.status} ${response.statusText}`)
            }
            const createdTodo: TodoType = await response.json()

            // set(state => ({
            //     todos: [{...createdTodo}, ...state.todos]
            // }))

            set(state => ({
                todos: [{...createdTodo}, ...state.todos]
            }))
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    },
    changeCurrentPage: (page) => {
        set({
            currentPage: page
        })
    },
    loadMorePosts: async (page: number) => {
        try {
            set({loading: true})
            const res = await fetch(`${BASE_URL}?_page=${page}`)
            const fetchedTodos: TodoType[] = await res.json()
            console.log(typeof fetchedTodos[0].id)
            set((state) => {
                if (state.todos.length === 0) {
                    return ({
                        todos: [...fetchedTodos]
                    })
                }
                const newTodosFiltered = fetchedTodos.filter(todo => {
                    let match = 0
                    state.todos.forEach(t => {
                        if (t.id === todo.id) {
                            match++
                        }
                    })
                    return match === 0 ? true : false
                })
                return ({
                    todos: [...state.todos, ...newTodosFiltered]
                })
            })
            
        } catch (error) {
            if(error instanceof Error) console.log(error.message)
        } finally {
            set({loading: false})
        }
    }
}))