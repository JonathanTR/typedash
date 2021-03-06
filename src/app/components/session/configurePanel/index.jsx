import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import Downloader             from '../../downloader';
import accessors              from '../accessors';
import actions                from '../actions';
import styles                 from './styles';

import editorActions          from '../../editor/actions';
import editorAccessors        from '../../editor/accessors';

function mapStateToProps (state) {
  return {
    sessionLength: accessors.getSessionLength(state),
    wordCountGoal: accessors.getWordCountGoal(state),
    fadeDuration:  editorAccessors.getFadeDuration(state),
    passage:       editorAccessors.getPassage(state),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setIsEnabled:     actions.setIsEnabled,
    setSessionLength: actions.setSessionLength,
    setWordCountGoal: actions.setWordCountGoal,
    setFadeDuration:  editorActions.setFadeDuration,
    resetPassage:     editorActions.resetPassage,
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
    const { sessionLength,
            isInSession,
            wordCountGoal,
            fadeDuration,
            passage,
            resetPassage,
          } = this.props
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
            <label key={num} className={styles.sessionLengthOption}>
              <input onChange={this.handleChangeSessionLength.bind(this)}
                     checked={num == (sessionLength / 60) ? 'checked' : ''}
                     style={{cursor: 'pointer'}}
                     name='duration'
                     type='radio'
                     value={num}>
              </input>
              {num}m
            </label>
          )}
        </div>

        <div className={styles.configurePanel__option}>
         <label className={styles.configurePanel__label}>
            fade timer
          </label>
          <br/>
          {FADE_OPTIONS.map((num) =>
            <label key={num} className={styles.sessionLengthOption}>
              <input onChange={this.handleFadeTimerChange.bind(this)}
                     checked={num == fadeDuration ? 'checked' : ''}
                     style={{cursor: 'pointer'}}
                     name='fadeTimer'
                     type='radio'
                     value={num}>
              </input>
              {num}s
            </label>
          )}
        </div>

        {passage.length == 0 ?
          <button className={styles.configurePanel__button}
                  onClick={this.handleClickStart.bind(this)}>
            START
          </button>
        :
          <div>
            <Downloader fileContents={passage}/>
            <a href='#' onClick={resetPassage}>reset</a>
          </div>
        }
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurePanel)
