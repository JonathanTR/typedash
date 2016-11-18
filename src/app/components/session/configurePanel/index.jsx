import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import accessors              from '../accessors';
import actions                from '../actions';
import styles                 from './styles';

import editorActions          from '../../editor/actions';

function mapStateToProps (state) {
  return {
    sessionLength: accessors.getSessionLength(state),
    wordCountGoal: accessors.getWordCountGoal(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setIsEnabled:     actions.setIsEnabled,
    setSessionLength: actions.setSessionLength,
    setWordCountGoal: actions.setWordCountGoal,
    setFadeDuration:  editorActions.setFadeDuration,
  }, dispatch);
}


const SESSION_OPTIONS = [1, 5, 15, 30, 45]
const FADE_OPTIONS = [2, 5, 10]

class ConfigurePanel extends Component {

  handleChangeSessionLength (e) {
    this.props.setSessionLength(Number(e.target.value * 60))
  }

  handleWordCountGoalChange (e) {
    this.props.setWordCountGoal(Number(e.target.value))
  }

  handleFadeTimerChange (e) {
    this.props.setFadeDuration(e.target.value)
  }

  handleClickStart (e) {
    e.preventDefault()
    this.props.setIsEnabled(true)
  }

  render () {
    const { sessionLength, isInSession, wordCountGoal } = this.props
    return (
      <form className={styles.configurePanel}>
        <div className={styles.configurePanel__option}>
          <label className={styles.configurePanel__label}>
            target word count
          </label>
          <br/>
          <input type='number'
                 className={styles.wordCountGoalInput}
                 name='wordCountGoal'
                 value={wordCountGoal}
                 onChange={this.handleWordCountGoalChange.bind(this)}>
          </input>
        </div>

        <div className={styles.configurePanel__option}>
          <label className={styles.configurePanel__label}>
            session length
          </label>
          <br/>
          {SESSION_OPTIONS.map((num) =>
            <label key={num}>
              <input onChange={this.handleChangeSessionLength.bind(this)}
                     className={styles.sessionLengthOption}
                     name='duration'
                     type='radio'
                     value={num}>
              </input>
              {num}
            </label>
          )}
        </div>

        <div className={styles.configurePanel__option}>
         <label className={styles.configurePanel__label}>
            fade timer
          </label>
          <br/>
          {FADE_OPTIONS.map((num) =>
            <label key={num}>
              <input onChange={this.handleFadeTimerChange.bind(this)}
                     className={styles.sessionLengthOption}
                     name='fadeTimer'
                     type='radio'
                     value={num}>
              </input>
              {num}
            </label>
          )}
        </div>

        <button className={styles.configurePanel__button}
                onClick={this.handleClickStart.bind(this)}>
          START
        </button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurePanel)
