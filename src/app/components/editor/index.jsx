import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';
import {bindActionCreators}   from 'redux';
import {connect}              from 'react-redux';

import accessors              from './accessors';
import actions                from './actions';
import styles                 from './styles';

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
  onTextChange (event) {
    this.props.setPassage(event.currentTarget.value)
  }

  render () {
    const { life } = this.props
    return(
      <div>
        <textarea
          className={styles.editor}
          onChange={this.onTextChange.bind(this)}
          placeholder='Enter your passage'
          style={{opacity: life * 0.01}}
          value={this.props.passage}
          >
        </textarea>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor)
