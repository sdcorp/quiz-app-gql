import React from 'react'
import { useLoginMutation } from '../generated/graphql'
import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Input as InputField, Form, Button } from 'antd'
import { loader } from 'graphql.macro'

const meQuery = loader('../graphql/me.graphql')

interface LoginInput {
  email: string
  password: string
}

export const Login: React.FC = () => {
  let history = useHistory()
  const { control, handleSubmit } = useForm<LoginInput>()
  const [login] = useLoginMutation()

  const submitForm = async (variables: LoginInput) => {
    const res = await login({
      variables,
      refetchQueries: [{ query: meQuery }],
    })
    const user = res.data?.login
    if (!user) {
      alert('Invalid auth')
      return
    }
    alert(JSON.stringify(user, null, 2))
    history.push('/')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(submitForm)} className="login-form">
        <Form.Item>
          <Controller as={<InputField placeholder="email" />} name="email" control={control} />
        </Form.Item>
        <Form.Item>
          <Controller as={<InputField placeholder="password" type="password" />} name="password" control={control} />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    </div>
  )
}
