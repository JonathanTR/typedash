import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import styles                 from './styles';
import Editor                 from '../editor';
import Timer                  from '../timer';
import Clock                  from '../clock';
import ConfigurePanel         from './configurePanel';

import accessors              from './accessors';
import actions                from './actions';

function mapStateToProps (state) {
  return {
    isInSession: accessors.getIsInSession(state),
    sessionLength: accessors.getSessionLength(state),
    wordCountGoal: accessors.getWordCountGoal(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setIsInSession: actions.setIsInSession,
    setSessionLength: actions.setSessionLength,
    setWordCountGoal: actions.setWordCountGoal,
  }, dispatch);
}

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionCanBeStarted: false,
      resetSession: false
    }
  }

  startSession () {
    const { sessionCanBeStarted } = this.state
    if (sessionCanBeStarted) {
      this.props.setIsInSession(true)
    }
  }

  stopSession () {
    this.props.setIsInSession(false)
  }

  resetSession () {
    this.setState({resetSession: true})
  }

  handleTimerStop () {
    this.stopSession()
    this.resetSession()
  }

  // HACK alert. By resetting the timer declaratively, we leave an artifact
  // behind: our state has this resetSession: true in it. This clears that
  // variable so we can use it again. There has to be a better way to do this
  // but I want to keep moving.
  handleTimerReset () {
    this.setState({resetSession: false, sessionCanBeStarted: false})
  }

  handleClickStart (e) {
    e.preventDefault()
    this.setState({sessionCanBeStarted: true})
  }

  handleChangeSessionLength (e) {
    this.props.setSessionLength(Number(e.target.value * 60))
  }

  handleWordCountGoalChange (e) {
    this.props.setWordCountGoal(Number(e.target.value))
  }

  render () {
    const { resetSession, sessionCanBeStarted, wordcount } = this.state
    const { sessionLength, isInSession, wordCountGoal } = this.props
    return(
      <div>
        <Timer duration={sessionLength}
               isRunning={isInSession}
               shouldReset={resetSession}
               onStop={this.handleTimerStop.bind(this)}
               onReset={this.handleTimerReset.bind(this)}>
          {(seconds, percent) =>
            <div>
              <Clock seconds={sessionLength - seconds} />
              <wordCount className={styles.wordcount}>
                {`${wordcount || 0} of ${wordCountGoal}`}
              </wordCount>
              <Editor isDecayable={sessionCanBeStarted}
                      onBeginEditing={this.startSession.bind(this)}
                      wordCountGoal={this.props.wordCountGoal}
                      onReachWordCount={this.stopSession.bind(this)}
                      onEdit={this.handleWordCountChange.bind(this)}>
              </Editor>
            </div>
          }
        </Timer>
        <ConfigurePanel />
        <button onClick={this.handleClickStart.bind(this)}>
          START
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
