import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';


class Timer extends Component {
  constructor (props) {
    super(props)
    this.interval = null
    this.state = {
      running: false,
      startedAt: null,
      totalSeconds: 5
    }
  }

  tick = () => {
    const secondsElapsed = (Date.now() - this.state.startedAt) / 1000
    if (secondsElapsed >= this.state.totalSeconds || !this.state.running) {
      this.stop()
    }
    console.log(this.state.totalSeconds)
    console.log(secondsElapsed)
  }

  start = () => {
    this.setState({running: true, startedAt: Date.now()})
    this.interval = setInterval(this.tick, 10)
  }

  stop = () => {
    this.setState({running: false})
  }

  render () {
    return (
      <div>
        <pre>
          {JSON.stringify(this.state, null, 1)}
        </pre>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    )
  }
}


export default Timer
