import React from 'react'
import { useGetCategoriesQuery } from '../generated/graphql'
import { Card } from 'antd'

export const Home: React.FC = () => {
  const { data, loading, error } = useGetCategoriesQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <div className="App">
      <Card title="Categories">
        {data?.getCategories.map(category => (
          <Card.Grid className="card__grid">{category.name}</Card.Grid>
        ))}
      </Card>
    </div>
  )
}
