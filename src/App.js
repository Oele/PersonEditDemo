import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainApp from './components/MainApp';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <MainApp />
      </div>
    );
  }
}
