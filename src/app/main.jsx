import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store';
import Session                from './components/session'

class Main extends Component {
  render () {
    return(
      <Provider store={store}>
        <Session />
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
