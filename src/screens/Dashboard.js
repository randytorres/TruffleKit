import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.user.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data
})

export default connect(mapStateToProps)(Dashboard)
