import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import styles                 from './styles'

export default class Navbar extends Component {
  render () {
    return (
      <div className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarLogo}>
            <span className={styles.navbarLogoDash}>_</span>typedash
          </div>
        </div>
      </div>
    )
  }
}
