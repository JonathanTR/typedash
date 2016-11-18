import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import styles                 from './styles';
import Editor                 from '../editor';
import Timer                  from '../timer';
import Clock                  from './clock';
import ConfigurePanel         from './configurePanel';

import accessors              from './accessors';
import actions                from './actions';

function mapStateToProps (state) {
  return {
    isEnabled:     accessors.getIsEnabled(state),
    isInSession:   accessors.getIsInSession(state),
    sessionLength: accessors.getSessionLength(state),
    wordCountGoal: accessors.getWordCountGoal(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setIsEnabled:     actions.setIsEnabled,
    setIsInSession:   actions.setIsInSession,
    setSessionLength: actions.setSessionLength,
    setWordCountGoal: actions.setWordCountGoal,
  }, dispatch);
}

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resetSession: false
    }
  }

  startSession () {
    const { isEnabled } = this.props
    if (isEnabled) {
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
    this.setState({resetSession: false})
    this.props.setIsEnabled(false)
  }


  handleWordCountChange (count) {
    this.setState({wordcount: count})
  }


  render () {
    const { resetSession, wordcount } = this.state
    const { isEnabled, sessionLength, isInSession, wordCountGoal } = this.props
    return(
      <div>
        <ConfigurePanel />
        <Timer duration={sessionLength}
               isRunning={isInSession}
               shouldReset={resetSession}
               onStop={this.handleTimerStop.bind(this)}
               onReset={this.handleTimerReset.bind(this)}>
          {(seconds, percent) =>
            <div>
              <Editor isDecayable={isEnabled}
                      onBeginEditing={this.startSession.bind(this)}
                      wordCountGoal={this.props.wordCountGoal}
                      onReachWordCount={this.stopSession.bind(this)}
                      onEdit={this.handleWordCountChange.bind(this)}>
              </Editor>
              <div className={styles.indicators}>
                <wordCount className={styles.wordcount}>
                  {`${wordcount || 0} of ${wordCountGoal} words`}
                </wordCount>
                <Clock seconds={sessionLength - seconds} />
              </div>
            </div>
          }
        </Timer>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
