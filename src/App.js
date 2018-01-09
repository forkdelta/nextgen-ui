import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TICKER_UPDATE_INTERVAL } from './config';
import { fetchTickerIfNeeded } from './store/actions';

class App extends Component {
  tickerInterval = null;

  componentDidMount() {
    this.startTickerUpdates();
  }

  componentWillUnmount() {
    this.stopTickerUpdates();
  }

  startTickerUpdates() {
    const { dispatch } = this.props;
    dispatch(fetchTickerIfNeeded());
    this.tickerInterval = setInterval(() => {
      dispatch(fetchTickerIfNeeded());
    }, TICKER_UPDATE_INTERVAL);
  }

  stopTickerUpdates() {
    this.tickerInterval && clearInterval(this.tickerInterval);
  }

  render() {
    const { ticker, websocket } = this.props;
    return (
      <div>
        <p>{websocket.status}</p>
        <p>{JSON.stringify(ticker)}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { ticker, websocket } = state;
  return { ticker, websocket };
}

export default connect(mapStateToProps)(App);
