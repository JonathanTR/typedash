import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';


class Clock extends Component {
  unitsFromSeconds (timeInSeconds) {
    const total = Number(timeInSeconds)
    return {
      hours:       Math.floor(timeInSeconds / 3600 % 24),
      minutes:     Math.floor(timeInSeconds / 60 % 60),
      seconds:     Math.floor(timeInSeconds % 60),
    }
  }

  padZero (num, size = 2) {
    const numString = String(num)
    if (numString.length < size){
      return '0'.repeat(size - numString.length) + numString
    } else {
      return numString
    }
  }

  render () {
    const { hours, seconds, minutes } = this.unitsFromSeconds(this.props.seconds)
    return (
      <div>
        {hours ? `${this.padZero(hours)}:` : ''}
        {`${this.padZero(minutes)}`}:
        {`${this.padZero(seconds)}`}
      </div>
    )
  }
}

export default Clock
