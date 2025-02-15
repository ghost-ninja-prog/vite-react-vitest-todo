import React, { useState } from "react"
import { Typography } from "antd"
import styled from "styled-components"

import TodoList from "../components/TodoList/TodoList"
import TodoPlus from "../components/TodoPlus/TodoPlus"
import Categories from "../components/Categories/Categories"

const { Title } = Typography


const Wrapper = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`

export const App: React.FC = () => {

  const [selectedValue, setSelectedValue] = useState('all')

  return (
    <Wrapper>
      <Title level={2}>
        Todo List
      </Title>
      <TodoPlus />
      <Categories setSelectedValue={ setSelectedValue } />
      <TodoList selectedValue={ selectedValue }/>
    </Wrapper>
  )
}


