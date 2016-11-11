import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {Provider, connect}    from 'react-redux';

import styles                 from './styles';
import Editor                 from '../editor';
import Timer                  from '../timer';
import Clock                  from '../clock';

import accessors              from './accessors';
import actions                from './actions';

function mapStateToProps (state) {
  return {
    sessionLength: accessors.getSessionLength(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setSessionLength: actions.setSessionLength
  }, dispatch);
}

class TypeDash extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionCanBeStarted: false,
      wordCountGoal: 417,
      isInSession: false,
      resetSession: false
    }
  }

  startSession () {
    const { sessionCanBeStarted } = this.state
    if (sessionCanBeStarted) {
      this.setState({isInSession: true})
    }
  }

  stopSession () {
    this.setState({isInSession: false})
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

  render () {
    const { isInSession, resetSession, sessionCanBeStarted } = this.state
    const { sessionLength } = this.props
    console.log(this.props)
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
                {`${this.state.wordCount || 0} of ${this.state.wordCountGoal}`}
              </wordCount>
              <Editor isDecayable={sessionCanBeStarted}
                      onBeginEditing={this.startSession.bind(this)}
                      wordCountGoal={this.state.wordCountGoal}
                      onReachWordCount={this.stopSession.bind(this)}
                      onEdit={(count) => this.setState({wordCount: count})}/>
            </div>
          }
        </Timer>
        <form className={styles.configure}
              onChange={(e) => this.props.setSessionLength(Number(e.target.value * 60))}>
          {[1,5,15,30,45,60].map((num) =>
            <label className={`${styles.configure__label} ${num * 60 == sessionLength ? styles.configure__label_selected : ''}`}
                   key={num}>
              <input name='duration'
                     className={styles.configure__radio}
                     type='radio'
                     value={num}>
              </input>
              {num}
            </label>
          )}
          <button className={styles.configure__start}
                  onClick={this.handleClickStart.bind(this)}>
            START
          </button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDash)