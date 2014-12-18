var React = require('react')
var canvas = React.DOM.canvas

module.exports = React.createClass({
  displayName: 'WaveForm',
  componentDidMount: function() {
    var analyser = this.props.analyser
    var canvas = this.getDOMNode()
    canvas.width = canvas.clientWidth * window.devicePixelRatio
    canvas.height = canvas.clientHeight * window.devicePixelRatio
    var width = canvas.width
    var height = canvas.height
    var ctx = canvas.getContext('2d')

    var bufferLength = analyser.fftSize
    var data = new Uint8Array(bufferLength)
    var step = width / bufferLength

    function draw() {
      var x = 0

      analyser.getByteTimeDomainData(data)
      ctx.fillStyle = 'rgba(255,255,255, 0.01)'
      ctx.fillRect(0, 0, width, height)
      // ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(0,0,0, 1)'

      ctx.beginPath()

      for(var i = 0; i < bufferLength; i++, x += step) {
        var v = data[i] / 128.0
        var y = v * height * 0.5

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke()

      requestAnimationFrame(draw)
    }
    draw()
  },

  render: function() {
    return canvas({className: 'WaveForm'})
  }
})
