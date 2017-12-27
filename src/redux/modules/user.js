import { push } from 'react-router-redux';
import AuthenticationContract from '../../../build/contracts/Authentication.json'
import store from '../../index'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_UPDATED = 'USER_UPDATED'

function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          authenticationInstance.login({from: coinbase})
          .then(function(result) {
            // If no error, login user.
            var userName = web3.toUtf8(result)

            dispatch(userLoggedIn({ "name": userName }))
            dispatch(push('/dashboard'))
          })
          .catch(function(error) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!', 'Error:', error)
            dispatch(push('/signup'))
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    dispatch(userLoggedOut())

    // Redirect home.
    dispatch(push('/'))
  }
}


export function updateUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          authenticationInstance.update(name, {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            dispatch(userUpdated({"name": name}))

            return alert(`Name updated to ${name}`)
          })
          .catch(function(result) {
            console.error(result)
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to sign up user.
          authenticationInstance.signup(name, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            dispatch(loginUser())
          })
          .catch(function(result) {
            console.error(result)
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
    case USER_UPDATED:
      return {
        ...state,
        data: action.payload
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        data: null
      }
    default:
      return state;
  }
}

export default userReducer
