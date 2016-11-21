import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import accessors              from './accessors';
import actions                from './actions';
import styles                 from './styles';
import Timer                  from '../timer'

import sessionActions         from '../session/actions';

function mapStateToProps (state) {
  return {
    fadeDuration: accessors.getFadeDuration(state),
    passage: accessors.getPassage(state),
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setPassage: actions.setPassage,
    setIsInSession: sessionActions.setIsInSession,
  }, dispatch);
};


class Editor extends Component {
  constructor (props) {
    super()
    this.state = {
      isDecaying: false,
      resetDecay: false
    }
  }

  handleTextChange (event) {
    const text = event.currentTarget.value
    const wordCount = text ? text.match(/\S+/g).length : 0
    this.props.setPassage(text)
    this.props.onEdit(wordCount)
    if (wordCount == this.props.wordCountGoal) {
      this.props.onReachWordCount()
    }
  }

  handleKeyDown (event) {
    this.resetDecay()
  }

  resetDecay () {
    this.setState({
      resetDecay: true,
      isDecaying: false
    })
  }

  startDecay () {
    this.props.onBeginEditing()
    if (this.props.isDecayable) {
      this.setState({isDecaying: true})
    }
  }

  onStopDecayTimer () {
    if (this.props.isDecayable) {
      this.setState({isDecaying: false})
      this.props.setPassage('')
      this.props.setIsInSession(false)
    } else {
      this.resetDecay()
      this.props.onStop()
    }
  }

  handleCutCopy (e) {
    if (this.props.isDecayable) {
      e.preventDefault()
    }
  }

  render () {
    const { isDecaying, resetDecay } = this.state
    const { fadeDuration, isDecayable } = this.props
    return (
      <div className={styles.editorContainer}>
        <Timer duration={fadeDuration}
               isRunning={ isDecayable ? isDecaying : false}
               shouldReset={resetDecay}
               onStop={this.onStopDecayTimer.bind(this)}
               onReset={() => this.setState({resetDecay: false})}>
          {(seconds, percent) =>
            <textarea
              className={styles.editor}
              onChange={this.handleTextChange.bind(this)}
              onCut={this.handleCutCopy.bind(this)}
              onCopy={this.handleCutCopy.bind(this)}
              placeholder={isDecayable ? 'The session will begin when you start typing' : 'Choose a target word count, session length, and fade timer. Then press "Start."'}
              style={{color: `rgb(${Math.round(255 / 100 * percent)},0,0)`}}
              onKeyDown={this.handleKeyDown.bind(this)}
              onKeyUp={this.startDecay.bind(this)}
              value={this.props.passage}
              >
            </textarea>
          }
        </Timer>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor)
