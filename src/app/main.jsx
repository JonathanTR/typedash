import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store'
import Editor                 from './components/editor'
import Timer                  from './components/timer'

class Main extends Component {

  render () {
    return(
      <Provider store={store}>
        <div>
          <Timer duration={5}>
            {(seconds, percent) =>
              <div>
                <pre>
                  {JSON.stringify({percent, seconds}, null, 1)}
                </pre>
                <Editor opacity={(100 - percent) * 0.01} />
              </div>
            }
          </Timer>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
