import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './components/app/Navbar';
import WebsocketConnectingOverlay from './components/app/WebsocketConnectingOverlay';
import { TICKER_UPDATE_INTERVAL } from './config';
import { fetchTickerIfNeeded, fetchTokensListIfNeeded } from './store/actions';

class App extends Component {
  tickerInterval = null;

  componentDidMount() {
    const { dispatch } = this.props;
    this.startTickerUpdates();
    dispatch(fetchTokensListIfNeeded());
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
    const {
      pairs,
      tickerLastUpdated,
      websocket,
      websocketOffline,
    } = this.props;
    return (
      <div>
        <Navbar pairs={pairs} tickerLastUpdated={tickerLastUpdated} />
        <div id="content">
          <p>{websocket.status}</p>
          <p>
            {(!!tickerLastUpdated &&
              new Date(tickerLastUpdated.getTime()).toTimeString()) ||
              'never'}
          </p>
          <p>{JSON.stringify(pairs)}</p>
        </div>

        <WebsocketConnectingOverlay isOpen={websocketOffline} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    ticker: { data: ticker, lastUpdated: tickerLastUpdated },
    tokens: { data: tokens },
    websocket,
  } = state;

  const pairs = Object.keys(tokens).reduce((memo, addr) => {
    memo[addr] = { ...ticker[addr], ...tokens[addr] };
    return memo;
  }, {});

  const websocketOffline = websocket.status !== 'connected';

  return {
    pairs,
    ticker,
    tickerLastUpdated,
    tokens,
    websocket,
    websocketOffline,
  };
}

export default connect(mapStateToProps)(App);
