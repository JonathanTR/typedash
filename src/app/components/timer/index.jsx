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
      secondsLeft: 0,
      percentDone: 0
    }
  }


  timeIsUp () {
    const { duration } = this.props
    const secondsElapsed = (Date.now() - this.startedAt) / 1000
    return secondsElapsed >= this.props.duration
  }

  tick () {
    if (this.timeIsUp()) { return this.stop() }
    const { duration } = this.props
    const secondsElapsed = (Date.now() - this.startedAt) / 1000
    this.setState({
      secondsLeft: duration - secondsElapsed,
      percentDone: Math.floor(secondsElapsed / duration * 100)
    })
  }

  start () {
    this.startedAt = Date.now()
    this.interval = setInterval(this.tick.bind(this), 10)
  }

  stop () {
    this.startedAt = null
    this.setState({secondsLeft: 0, percentDone: 100})
    clearInterval((this.interval))
  }

  render () {
    const { secondsLeft, percentDone} = this.state
    const { children } = this.props
    return (
      <div>
        {children(secondsLeft, percentDone)}
        <button onClick={this.start.bind(this)}>START</button>
        <button onClick={this.stop.bind(this)}>STOP</button>
      </div>
    )
  }
}


export default Timer
