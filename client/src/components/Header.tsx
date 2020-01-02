import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'
import { Layout, Menu, Icon } from 'antd'
import { PAGES } from '../routes/config'

// ? Header doesn't re-render after redirect from success auth

export const Header: React.FC = () => {
  const location = useLocation()
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })

  if (loading) return <p>Loading...</p>
  return (
    <Layout.Header>
      <div className="logo">
        <Icon type="medium" />
      </div>
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key={PAGES.HOME}>
          <Link to={PAGES.HOME}>Home</Link>
        </Menu.Item>
        {data?.me ? (
          <Menu.Item key={PAGES.PROFILE}>
            <Link to={PAGES.PROFILE}>Profile</Link>
          </Menu.Item>
        ) : (
          <Menu.Item key={PAGES.LOGIN}>
            <Link to={PAGES.LOGIN}>Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Layout.Header>
  )
}
