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
      isCountDownRunning: false
    }
  }

  startCountDown () {
    this.setState({isCountDownRunning: true})
  }

  stopCountDown () {
    this.setState({isCountDownRunning: false})
  }

  render () {
    return(
      <Provider store={store}>
        <div>
          <Timer duration={5}
                 onStop={this.stopCountDown.bind(this)}
                 isRunning={this.state.isCountDownRunning}
                 >
            {(seconds, percent) =>
              <div>
                <pre>
                  {JSON.stringify({killTimer: {percent, seconds}}, null, 1)}
                </pre>
                <Editor opacity={(100 - percent) * 0.01} />
              </div>
            }
          </Timer>
          <button onClick={this.startCountDown.bind(this)}>START</button>
          <button onClick={this.stopCountDown.bind(this)}>STOP</button>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
