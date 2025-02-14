import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'



const Loader: React.FC = () => {
  return (
    <div>
        <Spin indicator={<LoadingOutlined spin/>} />
    </div>
  )
}

export default Loader