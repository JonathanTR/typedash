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
      sessionCanBeStarted: false,
      sessionDuration: 60,
      isInSession: false,
      resetSession: false
    }
  }

  startSession () {
    const { sessionCanBeStarted } = this.state
    if (sessionCanBeStarted) {
      this.setState({isInSession: true})
    }
  }

  stopSession () {
    this.setState({isInSession: false})
  }

  resetSession () {
    this.setState({resetSession: true})
  }

  handleTimerStop () {
    this.stopSession()
    this.resetSession()
  }

  // HACK alert. By resetting the timer declaratively, we leave an artifact
  // behind: our state has this resetSession: true in it. This clears that
  // variable so we can use it again. There has to be a better way to do this
  // but I want to keep moving.
  handleTimerReset () {
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
                 onStop={this.handleTimerStop.bind(this)}
                 onReset={this.handleTimerReset.bind(this)}>
            {(seconds, percent) =>
              <div>
                <Clock seconds={sessionDuration - seconds} />
                <Editor isDecayable={isInSession}
                        onBeginEditing={this.startSession.bind(this)} />
              </div>
            }
          </Timer>
          <button onClick={() => this.setState({sessionCanBeStarted: true})}>START</button>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
