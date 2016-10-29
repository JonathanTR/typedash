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
      decayDuration: 5,
      isDecaying: false,
      shouldReset: false
    }
  }

  startCountDown () {
    this.setState({isDecaying: true})
  }

  stopCountDown () {
    this.setState({isDecaying: false})
  }

  triggerShouldReset () {
    this.setState({shouldReset: true})
  }

  clearShouldReset () {
    this.setState({shouldReset: false})
  }

  render () {
    const { decayDuration, isDecaying, shouldReset } = this.state
    return(
      <Provider store={store}>
        <div>
          <Timer duration={decayDuration}
                 isRunning={isDecaying}
                 shouldReset={shouldReset}
                 onReset={this.clearShouldReset.bind(this)}
                 onStop={this.stopCountDown.bind(this)}
                 >
            {(seconds, percent) =>
              <div>
                <pre>
                  {JSON.stringify({decayTimer: {percent, seconds}}, null, 1)}
                </pre>
                <Editor life={100 - percent} />
              </div>
            }
          </Timer>
          <button onClick={this.startCountDown.bind(this)}>START</button>
          <button onClick={this.stopCountDown.bind(this)}>STOP</button>
          <button onClick={this.triggerShouldReset.bind(this)}>RESET</button>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
