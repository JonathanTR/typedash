import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store'
import Editor                 from './components/editor'
import Timer                  from './components/timer'
import Clock                  from './components/clock'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionDuration: 60,
      isInSession: false,
      resetSession: false
    }
  }
  // Session Timer
  startSession () {
    this.setState({isInSession: true})
  }

  stopSession () {
    this.setState({isInSession: false})
  }

  triggerShouldResetSession () {
    this.setState({resetSession: true})
  }

  clearShouldResetSession () {
    this.setState({resetSession: false})
  }


  render () {
    const { sessionDuration, isInSession, resetSession } = this.state
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
                <Clock seconds={sessionDuration - seconds} />
                <Editor isDecayable={isInSession} />
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
