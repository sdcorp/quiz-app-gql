import React from 'react'
import { useLoginMutation } from '../generated/graphql'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loader } from 'graphql.macro'

const meQuery = loader('../graphql/me.graphql')

interface LoginInput {
  email: string
  password: string
}

export const Login: React.FC = () => {
  let history = useHistory()
  const { handleSubmit, register, errors } = useForm<LoginInput>()
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
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          name="email"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
        />
        {errors.email && errors.email.message}

        <input
          name="password"
          type="password"
          ref={register({
            validate: value => value !== 'admin' || 'Nice try!',
          })}
        />
        {errors.password && errors.password.message}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
