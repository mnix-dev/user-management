import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Header from './components/header/'
import Spinner from './components/spinner'
import ErrorBoundary from './components/error-boundary'

import { GlobalStyle } from './global.styles'

import { selectCurrentUser } from './redux/user/selectors'
import { checkUserSession } from './redux/user/actions'

const HomePage = lazy(() => import('./pages/homepage/'))
const NotesPage = lazy(() => import('./pages/notes/'))
const ClockPage = lazy(() => import('./pages/clock/'))
const AuthPage = lazy(() => import('./pages/auth/'))


const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />} >
              <Route exact path='/' component={HomePage} />
              <Route path='/notes' component={NotesPage} />
              <Route path='/clock' component={ClockPage} />
              <Route
                exact
                path='/login'
                render={() =>
                  currentUser ?
                  ( <Redirect to='/' /> ) : ( <AuthPage /> )
                }
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
