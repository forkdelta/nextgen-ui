import React, { Component } from 'react';
import { connect } from 'react-redux';

function App({ websocket }) {
  return <div>{websocket.status}</div>;
}

function mapStateToProps(state) {
  const { websocket } = state;
  return { websocket };
}

export default connect(mapStateToProps)(App);
