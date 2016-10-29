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
      isDecayable: false,
      decayDuration: 5,
      isDecaying: false,
      resetDecay: false
    }
  }

  onTextChange (event) {
    this.props.setPassage(event.currentTarget.value)
  }

  resetTimer () {
    this.setState({resetDecay: true, isDecaying: false})
  }

  startTimer () {
    if (this.state.isDecayable) {
      this.setState({isDecaying: true})
    }
  }

  clearPassage () {
    this.setState({isDecaying: false})
    this.props.setPassage('')
  }

  render () {
    const { decayDuration, isDecaying, resetDecay } = this.state
    return (
      <div className={styles.editorContainer}>
        <Timer duration={decayDuration}
               isRunning={isDecaying}
               shouldReset={resetDecay}
               onStop={this.clearPassage.bind(this)}
               onReset={() => this.setState({resetDecay: false})}>
          {(seconds, percent) =>
            <textarea
              className={styles.editor}
              onChange={this.onTextChange.bind(this)}
              placeholder='Enter your passage'
              style={{opacity: percent == 100 ? 1 : (100 - percent) * 0.01}}
              onKeyDown={this.resetTimer.bind(this)}
              onKeyUp={this.startTimer.bind(this)}
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
