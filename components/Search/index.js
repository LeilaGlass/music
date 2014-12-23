var React = require('react')
var input = React.DOM.input

module.exports = React.createClass({
  displayName: 'Search',

  getDefaultProps() {
    return {
      color: '255,255,255',
      debounce: 250
    }
  },

  getInitialState() {
    return {
      query: this.props.query,
      timeoutId: null
    }
  },

  render() {
    var style = {
      color: 'rgb(' + this.props.color + ')'
    }

    return input({
      style: style,
      className: 'Search',
      value: this.state.query,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown
    })
  },

  handleChange(e) {
    this.props.setActive(!!e.target.value)

    clearTimeout(this.state.timeoutId)
    this.setState({
      query: e.target.value,
      timeoutId: setTimeout(this.sendQuery, this.props.debounce)
    })
  },

  sendQuery(query) {
    clearTimeout(this.state.timeoutId)
    this.props.setQuery(this.state.query)
  },

  handleKeyDown(e) {
    switch (e.which) {
    case 13:
      this.sendQuery()
    }
  }
})
