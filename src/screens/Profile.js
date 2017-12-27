import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateUser } from '../redux/modules/user'
import { Form } from '../components'

class Profile extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Edit your account details here.</p>
            <Form name={this.props.name} onFormSubmit={this.props.updateUser} />
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.user.data.name
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)