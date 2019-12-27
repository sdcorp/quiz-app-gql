import React from 'react'
import { useGetCategoriesQuery } from '../generated/graphql'

export const Home: React.FC = () => {
  const { data, loading, error } = useGetCategoriesQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <div className="App">
      <h1>Categories</h1>
      <ul>
        {data?.getCategories.map(c => (
          <li key={c.id}>
            {c.name}. Questions: {c.questionCount}
          </li>
        ))}
      </ul>
    </div>
  )
}
