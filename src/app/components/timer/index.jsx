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
      alreadyRunning: false,
      secondsLeft: 0,
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
    if (this.props.isRunning && !this.state.alreadyRunning) {
      this.setState({alreadyRunning: true})
      this.start()
    } else if (!this.props.isRunning && this.state.alreadyRunning) {
      this.setState({alreadyRunning: false})
      this.stop()
    }
  }

  timeIsUp () {
    const { duration } = this.props
    const secondsElapsed = (Date.now() - this.startedAt) / 1000
    return secondsElapsed >= this.props.duration
  }

  truncated (number) {
    return Number(number.toFixed(3))
  }

  tick () {
    const { duration }   = this.props
    const secondsElapsed = this.truncated((Date.now() - this.startedAt) / 1000)
    const secondsLeft    = this.truncated(duration - secondsElapsed)
    const percentDone    = Math.ceil(secondsElapsed / duration * 100)
    if (this.timeIsUp()) {
      this.setState({secondsLeft: 0, percentDone: 100})
      this.stop()
    } else {
      this.setState({secondsLeft, percentDone})
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
  }

  reset () {
    clearInterval(this.interval)
    this.startedAt = null
    this.setState({
      secondsLeft: this.props.duration,
      percentDone: 0,
      alreadyRunning: false
    })
  }

  render () {
    const { secondsLeft, percentDone} = this.state
    const { children } = this.props
    return children(secondsLeft, percentDone)
  }
}


export default Timer
