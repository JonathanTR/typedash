import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store'
import Editor                 from './components/editor'

class Main extends Component {

  render () {
    return(
      <Provider store={store}>
        <Editor />
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
