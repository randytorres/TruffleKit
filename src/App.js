import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { HiddenOnlyAuth, VisibleOnlyAuth, UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

import { loginUser, logoutUser } from './redux/modules/user'

// UI Components
import { Button } from './components'
import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'

// Styles
import './styles/css/oswald.css'
import './styles/css/open-sans.css'
import './styles/css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <Button text="Logout" onUserClick={this.props.logoutUser} />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">Sign Up</Link>
        </li>
        <Button text="Login" onUserClick={this.props.loginUser} />
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
          <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
        </nav>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route exact path="/signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route exact path="/profile" component={UserIsAuthenticated(Profile)} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser,
    logoutUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
