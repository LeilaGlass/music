import React from 'react'

import {css} from 'lib/css'
import {Base} from './Base'
import {GridItem} from './GridItem'

export class Grid extends Base {
  constructor(props) {
    super(props)

    this.state = {
      width: 1
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    let {children} = this.props

    return <div className="Grid">
      {this.renderGridItems(children)}
    </div>
  }

  renderGridItems(children) {
    let {itemSize} = this.props
    let {width} = this.state

    let cols = width / itemSize | 0
    let size = width / cols | 0

    return React.Children.map(children, (child, i) => {
      let x = i % cols
      let y = i / cols | 0
      return <GridItem {...{size, x, y}}>{child}</GridItem>
    })
  }

  handleResize() {
    let width = React.findDOMNode(this).clientWidth
    this.setState({width})
  }
}

Grid.defaultProps = {
  itemSize: 300,
}

css(".Grid", {
  transform: "translate3d(0,0,0)",
  position: "relative",
})
