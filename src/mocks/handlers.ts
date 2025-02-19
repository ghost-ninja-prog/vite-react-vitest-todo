import { http, HttpResponse } from "msw";
import { BASE_URL, TodoType } from "../store/useTodoStore";
import { mockTodos } from "./todosDB";


export const handlers = [
    http.get(`${BASE_URL}`, ({request}) => {
        const url = new URL(request.url)
        const page = url.searchParams.get('_page')
        if(page === null) {
            return HttpResponse.json([])
          } else {
            const responseTodos = mockTodos.filter(todo => todo.userId === Number(page))
            return HttpResponse.json(responseTodos)
          }
    }),

    http.delete(`${BASE_URL}/:id`, ({ params })  => {
      const { id } = params
      return HttpResponse.json({
        id,
        status: 200
      })
    }),

    http.put(`${BASE_URL}/:id`, async ({ request }) => {
      const updateTodo = await request.json() as TodoType
      return HttpResponse.json(updateTodo)
    }),

    http.post(`${BASE_URL}`, async ({ request }) => {
      const createdTodo = await request.json() as TodoType
      createdTodo.id = 201
      return HttpResponse.json(
        createdTodo,
        { status: 201 }
      )
    })
]