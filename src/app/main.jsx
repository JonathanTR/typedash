import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {Provider}             from 'react-redux';

import store                  from './store';
import Session                from './components/session';
import Navbar                 from './components/navbar';
import styles                 from './styles';

class Main extends Component {
  render () {
    return(
      <Provider store={store}>
        <div>
          <Navbar />
          <div className={styles.container}>
            <Session />
          </div>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('mainRoot'));
