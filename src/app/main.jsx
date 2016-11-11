import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store';
import TypeDash               from './components/typedash'

class Main extends Component {
  render () {
    return(
      <Provider store={store}>
        <TypeDash />
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
