import React from 'react'
import { useGetCategoriesQuery } from '../generated/graphql'

export const Home: React.FC = () => {
  const { data, loading, error } = useGetCategoriesQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <>
      <h2>Categories</h2>
      <ul>
        {data?.getCategories.map(category => (
          <div key={category.id} className="card__grid">
            {category.name}
          </div>
        ))}
      </ul>
    </>
  )
}
