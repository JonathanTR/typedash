import React, {Component}     from 'react';
import ReactDOM               from 'react-dom';

export default class Downloader extends Component {
  render () {
    const fileContents = new Blob([this.props.fileContents], {type: 'text/plain'});
    const encodedFileURL = window.URL.createObjectURL(fileContents)
    return (
      <a download={`Session from ${new Date().toLocaleString()}`}
         style={{display: 'block'}}
         href={encodedFileURL}>
         download
      </a>
    )
  }
}
