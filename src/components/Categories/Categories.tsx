import { Radio, RadioChangeEvent } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'




const CategoriesContainer = styled.div`
    text-align: center;
    margin: 20px auto;
`

type CategoriesProps = {
  setSelectedValue: Dispatch<SetStateAction<string>>
}

const Categories: React.FC<CategoriesProps> = ({ setSelectedValue }) => {


  const handlerChange = (event: RadioChangeEvent) => {
    setSelectedValue(event.target.value)
  }


  return (
    <CategoriesContainer>
      <Radio.Group onChange={handlerChange}>
        <Radio.Button value="all" defaultChecked>Все</Radio.Button>
        <Radio.Button value="completed" >Выполненные</Radio.Button>
        <Radio.Button value="active">Невыполненные</Radio.Button>
        <Radio.Button value="favorites">Избранное</Radio.Button>
      </Radio.Group>
    </CategoriesContainer>
  )
}

export default Categories