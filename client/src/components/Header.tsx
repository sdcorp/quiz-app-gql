import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'
import { PAGES } from '../routes/config'
import { Menu, Container, Responsive, Visibility, Segment, Button, Grid, List, Divider } from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const DesktopContainer: React.FC = ({ children }) => {
  const [fixedMenu, setFixedMenu] = useState(false)
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => setFixedMenu(true)}
        onBottomPassedReverse={() => setFixedMenu(false)}
      >
        <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
          <Menu
            fixed={fixedMenu ? 'top' : undefined}
            inverted={!fixedMenu}
            pointing={!fixedMenu}
            secondary={!fixedMenu}
            size="large"
          >
            <Container>
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item as="a">Work</Menu.Item>
              <Menu.Item as="a">Company</Menu.Item>
              <Menu.Item as="a">Careers</Menu.Item>
              <Menu.Item position="right">
                <Button as="a" inverted={!fixedMenu}>
                  Log in
                </Button>
                <Button as="a" inverted={!fixedMenu} primary={fixedMenu} style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}
// ? Header doesn't re-render after redirect from success auth
export const Header: React.FC = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })

  if (loading) return <p>Loading...</p>

  return (
    <header>
      <nav>
        <Link to={PAGES.HOME}>Home</Link>
        {data?.me ? <Link to={PAGES.PROFILE}>Profile</Link> : <Link to={PAGES.LOGIN}>Login</Link>}
      </nav>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} to={PAGES.HOME} header>
            {/* <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} /> */}
            Logo
          </Menu.Item>
          <Menu.Item as={Link} to={PAGES.HOME}>
            Home
          </Menu.Item>
          {data?.me ? (
            <Menu.Item as={Link} to={PAGES.PROFILE}>
              Profile
            </Menu.Item>
          ) : (
            <Menu.Item as={Link} to={PAGES.LOGIN}>
              Login
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </header>
  )
}

const HomepageLayout = () => (
  <DesktopContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>ROW</Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </DesktopContainer>
)
