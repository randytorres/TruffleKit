import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signUpUser } from '../redux/modules/user'

import { Form } from '../components'

class SignUp extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sign Up</h1>
            <p>We've got your wallet information, simply input your name and your account is made!</p>
            <Form onFormSubmit={this.props.signUpUser} />
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signUpUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)