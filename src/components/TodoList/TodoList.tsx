import React, { useCallback, useEffect, useRef } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import styled from 'styled-components'
import { useTodoStore } from '../../store/useTodoStore'
import Loader from '../Loader/Loader'

const WrapperTodoList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 400px;
    overflow: auto;
    margin: 0 auto;
    padding: 4px 7px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
`

type TodoListPropsType = {
	selectedValue: string
}

const TodoList: React.FC<TodoListPropsType> = ({ selectedValue }) => {

	const {
		loading,
		todos,
		currentPage,
		changeCurrentPage,
		loadMorePosts
	} = useTodoStore(state => state)

	const filteredTodos = todos.filter(todo => {
		if (selectedValue === 'all') {
			return todo
		} else if (selectedValue === 'completed') {
			return todo.completed === true
		} else if (selectedValue === 'active') {
			return todo.completed === false
		}
	})

	const observer = useRef<IntersectionObserver>()

	useEffect(() => {
		loadMorePosts(currentPage)
	}, [currentPage])


	const lastTodoElementRef: (el: HTMLDivElement) => void = useCallback(
		(el) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					changeCurrentPage(currentPage + 1)
				}
			},
				{
					root: document.querySelector('#listTodoRef'),
					rootMargin: '0px',
					threshold: 1.0
				}
			)
			if (el) observer.current?.observe(el)

		},
		[loading]
	)

	return (
		<WrapperTodoList id='listTodoRef'>
			{
				filteredTodos.map((todo, index) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						lastTodoElementRef={filteredTodos.length === index + 1 ? lastTodoElementRef : null}
					/>
				))
			}
			{loading && <Loader />}
		</WrapperTodoList>
	)
}

export default TodoList