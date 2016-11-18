import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import accessors              from '../accessors';
import actions                from '../actions';

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
  }, dispatch);
}

class ConfigurePanel extends Component {

  handleChangeSessionLength (e) {
    this.props.setSessionLength(Number(e.target.value * 60))
  }

  handleWordCountGoalChange (e) {
    this.props.setWordCountGoal(Number(e.target.value))
  }

  handleClickStart (e) {
    e.preventDefault()
    this.props.setIsEnabled(true)
  }

  render () {
    const { sessionLength, isInSession, wordCountGoal } = this.props
    return (
      <div>
        <form onChange={this.handleChangeSessionLength.bind(this)}>
          {[1,5,15,30,45,60].map((num) =>
            <label key={num}>
              <input name='duration'
                     type='radio'
                     value={num}>
              </input>
              {num}
            </label>
          )}
        </form>
        <input name='wordCountGoal'
               value={wordCountGoal}
               onChange={this.handleWordCountGoalChange.bind(this)}>
        </input>
        <button onClick={this.handleClickStart.bind(this)}>
          START
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurePanel)
