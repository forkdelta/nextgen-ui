import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './components/app/Navbar';
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
    const { pairs, tickerLastUpdated, websocket } = this.props;
    return (
      <div>
        <Navbar
          pairs={pairs}
          tickerLastUpdated={tickerLastUpdated}
          websocket={websocket}
        />
        <div id="content">
          <p>{websocket.status}</p>
          <p>
            {(!!tickerLastUpdated && tickerLastUpdated.toLocaleTimeString()) ||
              'never'}
          </p>
          <p>{JSON.stringify(pairs)}</p>
        </div>
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

  return { pairs, ticker, tickerLastUpdated, tokens, websocket };
}

export default connect(mapStateToProps)(App);
