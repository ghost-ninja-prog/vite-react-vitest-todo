import { DeleteOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Checkbox, CheckboxProps, Flex, Tooltip, Typography } from 'antd'
import React from 'react'
// import styled from 'styled-components'
import { TodoType, useTodoStore } from '../../store/useTodoStore'
import styles from './style.module.css'
import { useFavoritesStore } from '../../store/useFavoritesStore'

const { Text } = Typography

type TodoItemProps = {
    todo: TodoType,
    lastTodoElementRef?: ((el: HTMLDivElement) => void) | null
}

// const WrapperTodo = styled.div`
//     border: 1px solid rgba(0, 0, 0, .5);
//     border-radius: 7px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 5px 10px;
//     box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
//     transition: transform .2s ease-in-out;
//     &:hover {
//         transform: translateY(-2px);
//     }

// `

const TodoItem: React.FC<TodoItemProps> = ({ todo, lastTodoElementRef }) => {


    const { deleteTodo, updateTodo } = useTodoStore(state => state)
    const { addToFavorites, deleteFromFavorites } = useFavoritesStore(state => state)

    const onChangeHandler: CheckboxProps['onChange'] = () => {
        updateTodo({ ...todo, completed: !todo.completed })
    }

    const handlerClickStar = () => {
        if(todo.favorites) {
            deleteFromFavorites(todo.id)
        } else {
            addToFavorites({...todo, favorites: true})
        }
    }

    const handlerClickDelete = () => {
        deleteFromFavorites(todo.id)
        deleteTodo(todo.id)
    }

    return (
        <div
            className={styles.wrapper}
            ref={lastTodoElementRef}
        >
            <Flex wrap gap="small">
                <Checkbox onChange={onChangeHandler} checked={todo.completed} />
                <Tooltip title="favorites">
                    <Button onClick={handlerClickStar} type="primary" shape="circle" icon={<StarOutlined />} />
                </Tooltip>
            </Flex>
            <Text>{todo.title}</Text>
            <Button type='primary' danger ghost onClick={handlerClickDelete}>
                <DeleteOutlined />
            </Button>
        </div>
    )
}

export default TodoItem