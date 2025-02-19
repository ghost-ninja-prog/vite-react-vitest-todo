import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'

import TodoItem from './TodoItem'

const todo = {
    id: 1,
    userId: 1,
    title: 'title Todo',
    completed: false
}

const renderCounter = () => {
  return render(<TodoItem todo={todo} />)
}

describe('TodoItem', () => {
  test('should render with initial state of 1', async () => {
    renderCounter()
    expect(await screen.findByText('title Todo')).toBeInTheDocument()
  })
})

