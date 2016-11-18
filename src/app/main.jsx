import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store';
import Session                from './components/session'
import styles                 from './styles'

class Main extends Component {
  render () {
    return(
      <Provider store={store}>
        <div className={styles.container}>
          <Session />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
