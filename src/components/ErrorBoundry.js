import React, { Component } from 'react'

class ErrorBoundry extends Component {
  constructor(props) {
    super()
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    return hasError ? <h1>Oooooops. That's embarrassing</h1> : this.props.children
  }
}

export default ErrorBoundry
