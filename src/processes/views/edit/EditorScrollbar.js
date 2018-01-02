import React from 'react'
import ReactDOM from 'react-dom'

function isScrollable(element) {
  return element.scrollWidth > element.clientWidth
}

module.exports = class extends React.Component {
  static displayName = 'EditorScrollbar'

  static defaultProps = {
    thickness: 8,
    onScrollStart: function() {},
    onScrollEnd: function() {},
    onScroll: function() {},
  }

  state = {
    scrolling: false,
    scrollbarWidth: 0,
    barPosition: 0,
  }

  componentDidMount() {
    this.props.element.addEventListener('scroll', this.handleScroll)

    if (!ReactDOM.findDOMNode(this)) return
    this.setState({
      scrollbarWidth: ReactDOM.findDOMNode(this).clientWidth,
    })
  }

  componentWillUnmount() {
    this.props.element.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    if (!ReactDOM.findDOMNode(this)) return

    if (this.state.scrollbarWidth !== ReactDOM.findDOMNode(this).clientWidth) {
      this.setState({
        scrollbarWidth: ReactDOM.findDOMNode(this).clientWidth,
      })
    }
  }

  render() {
    if (!isScrollable(this.props.element)) {
      return null
    }

    var trackStyle = {
      height: this.props.thickness,
      borderRadius: this.props.thickness / 2,
    }

    var barStyle = {
      position: 'absolute',
      left: this.state.barPosition,
      height: this.props.thickness,
      borderRadius: this.props.thickness / 2,
      width: this.getRatio() * 100 + '%',
    }

    var cls = 'editor-scrollbar'
    if (this.state.scrolling) {
      cls += ' scrolling'
    }

    return (
      <div className={cls}>
        <div className="track" style={trackStyle}>
          <div
            className="bar"
            style={barStyle}
            onMouseDown={this.handleMouseDown}
          />
        </div>
      </div>
    )
  }

  handleMouseDown = ev => {
    ev.preventDefault()

    this.setState({
      initialPosition: ev.pageX,
      initialScroll: this.props.element.scrollLeft,
      scrolling: true,
    })

    document.addEventListener('mousemove', this.handleBarDrag)
    document.addEventListener('mouseup', this.handleMouseUp)

    this.props.onScrollStart()
  }

  handleMouseUp = ev => {
    this.setState({
      scrolling: false,
    })

    document.removeEventListener('mousemove', this.handleBarDrag)
    document.removeEventListener('mouseup', this.handleMouseUp)

    this.props.onScrollEnd()
  }

  handleBarDrag = event => {
    event.preventDefault()
    event.stopPropagation()

    var currentPosition = event.target.ownerDocument === document
      ? event.pageX
      : event.pageX
    var movement = -(this.state.initialPosition - currentPosition)
    var scaledMovement = movement / this.getRatio()

    this.props.element.scrollLeft = this.state.initialScroll + scaledMovement
  }

  getRatio = () => {
    return this.state.scrollbarWidth / this.props.element.scrollWidth
  }

  handleScroll = () => {
    if (!ReactDOM.findDOMNode(this)) return

    var widthRatio =
      ReactDOM.findDOMNode(this).clientWidth / this.props.element.scrollWidth
    this.setState({
      barPosition: this.props.element.scrollLeft * widthRatio,
    })

    this.props.onScroll()
  }
}



// WEBPACK FOOTER //
// ./src/processes/views/edit/EditorScrollbar.js