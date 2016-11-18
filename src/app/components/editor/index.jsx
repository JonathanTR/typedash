import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import accessors              from './accessors';
import actions                from './actions';
import styles                 from './styles';
import Timer                  from '../timer'

function mapStateToProps (state) {
  return {
    passage: accessors.getPassage(state)
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setPassage: actions.setPassage
  }, dispatch);
};


class Editor extends Component {
  constructor (props) {
    super()
    this.state = {
      decayDuration: 5,
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
    } else {
      this.resetDecay()
      this.props.onStop()
    }
  }

  render () {
    const { decayDuration, isDecaying, resetDecay } = this.state
    const { isDecayable } = this.props
    return (
      <div className={styles.editorContainer}>
        <Timer duration={decayDuration}
               isRunning={ isDecayable ? isDecaying : false}
               shouldReset={resetDecay}
               onStop={this.onStopDecayTimer.bind(this)}
               onReset={() => this.setState({resetDecay: false})}>
          {(seconds, percent) =>
            <textarea
              className={styles.editor}
              onChange={this.handleTextChange.bind(this)}
              placeholder={isDecayable ? 'The session will begin when you start typing' : 'Choose a session length and press "Start"'}
              style={{opacity: percent == 100 ? 1 : (100 - percent) * 0.01}}
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
