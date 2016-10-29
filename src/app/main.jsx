import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store'
import Editor                 from './components/editor'
import Timer                  from './components/timer'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionClock: {
        sessionDuration: 60,
        isInSession: false,
        resetSession: false
      },
      decayClock: {
        decayDuration: 5,
        isDecaying: false,
        resetDecay: false
      }
    }
  }
  // Session Timer
  startSession ()     {this.setState({sessionClock: {isInSession: true}})}
  stopSession ()      {this.setState({sessionClock: {isInSession: false}})}
  triggerShouldResetSession () {this.setState({sessionClock: {resetSession: true}})}
  clearShouldResetSession ()   {this.setState({sessionClock: {resetSession: false}})}

  render () {
    const { sessionDuration, isInSession, resetSession } = this.state.sessionClock
    const { decayDuration, isDecaying, resetDecay } = this.state.decayClock
    return(
      <Provider store={store}>
        <div>
          <Timer duration={60}
                 isRunning={isInSession}
                 shouldReset={resetSession}
                 onStop={this.stopSession.bind(this)}
                 onReset={this.clearShouldResetSession.bind(this)}>
            {(seconds, percent) =>
              <div>
                <Clock seconds={seconds} />
                <Editor />
              </div>
            }
          </Timer>
          <button onClick={this.startSession.bind(this)}>START</button>
          <button onClick={this.stopSession.bind(this)}>STOP</button>
          <button onClick={this.triggerShouldResetSession.bind(this)}>RESET</button>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
