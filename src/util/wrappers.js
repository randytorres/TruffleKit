import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const UserIsAuthenticated = connectedReduxRedirect({
  authenticatedSelector: state => state.user.data !== null,
  redirectAction: routerActions.replace,
  redirectPath: '/',
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = connectedReduxRedirect({
  authenticatedSelector: state => state.user.data === null,
  redirectAction: routerActions.replace,
  redirectPath: '/',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
})

// UI Component Wrappers

export const VisibleOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data !== null,
  wrapperDisplayName: 'VisibleOnlyAuth',
})

export const HiddenOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data === null,
  wrapperDisplayName: 'HiddenOnlyAuth',
})
