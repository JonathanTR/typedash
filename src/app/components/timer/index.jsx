import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';


class Timer extends Component {
  constructor () {
    super()
    this.interval = null
    this.startedAt = null
    this.state = {
      clockIsRunning: false,
      secondsElapsed: 0,
      savedSeconds: 0,
      percentDone: 0
    }
  }

  componentDidMount() {
    this.toggleTimerIsOn()
  }

  componentDidUpdate(prevProps, prevState) {
    this.toggleTimerIsOn()
  }

  toggleTimerIsOn () {
    if (this.props.isRunning && !this.state.clockIsRunning) {
      this.setState({clockIsRunning: true})
      this.start()
    } else if (!this.props.isRunning && this.state.clockIsRunning) {
      this.setState({clockIsRunning: false})
      this.stop()
    }
  }

  truncated (number) {
    return Number(number.toFixed(3))
  }

  tick () {
    const { duration }   = this.props
    const secondsElapsed = this.truncated((Date.now() - this.startedAt) / 1000) + this.state.savedSeconds
    const percentDone    = Math.ceil(secondsElapsed / duration * 100)
    if (secondsElapsed >= this.props.duration) {
      this.setState({secondsElapsed: 0, percentDone: 100})
      this.stop()
    } else {
      this.setState({secondsElapsed, percentDone})
    }
  }

  start () {
    this.startedAt = Date.now()
    this.interval = setInterval(this.tick.bind(this), 100)
  }

  stop () {
    this.props.onStop()
    clearInterval(this.interval)
    this.startedAt = null
    this.setState({savedSeconds: this.state.secondsElapsed})
  }

  reset () {
    clearInterval(this.interval)
    this.startedAt = null
    this.setState({
      secondsElapsed: 0,
      percentDone: 0,
      clockIsRunning: false,
      savedSeconds: 0
    })
  }

  render () {
    const { secondsElapsed, percentDone} = this.state
    const { children } = this.props
    return children(secondsElapsed, percentDone)
  }
}


export default Timer
