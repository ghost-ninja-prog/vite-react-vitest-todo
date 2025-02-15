import React from 'react'
import { Button, Form, FormProps, Input, Space } from 'antd';
import styled from 'styled-components'
import { useTodoStore } from '../../store/useTodoStore';

const WrapperForm = styled.div`
    margin: 20px auto;
`


const TodoPlus = () => {

    const { createTodo } = useTodoStore(state => state)
    const [ form ] = Form.useForm()


    type FieldType = {
        todoTitle: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const newTodo = {
            // id: Date.now().toString(),
            userId: 1,
            completed: false,
            title: values.todoTitle
        }
        createTodo(newTodo)
        form.resetFields(['todoTitle'])

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert(errorInfo.errorFields[0].errors)
    };

    return (
        <WrapperForm>
            <Form
                form={form}
                name="todoPlus"
                style={{ maxWidth: 600 }}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    wrapperCol={{ span: 60 }}
                    label={null}
                    name="todoTitle"
                    rules={[{ required: true, message: 'Please enter todo!' }]}
                >
                    <Space.Compact>
                        <Input placeholder='Enter todo title' style={{width: 350}}/>
                        <Button type="primary" htmlType='submit'>Add Todo</Button>
                    </Space.Compact>
                </Form.Item>
            </Form>
        </WrapperForm>
    )
}

export default TodoPlus