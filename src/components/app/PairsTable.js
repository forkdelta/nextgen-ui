import { format } from 'd3-format';
import React from 'react';
import ReactTable from 'react-table';

import './PairsTable.css';

function PairsTable({
  pairs,
  lastUpdated,
  onPairSelected,
  style = {},
  className = null,
}) {
  return (
    <ReactTable
      columns={COLUMNS}
      className={`-striped -highlight ${!!className ? className : ''}`}
      getTrProps={(state, rowInfo, column, instance) => ({
        onClick: e => console.log('A row was clicked!', rowInfo),
      })}
      data={Object.values(pairs)}
      defaultPageSize={100}
      defaultSorted={DEFAULT_SORT}
      minRows={10}
      showPagination={false}
      style={style}
    />
  );
}

const formatVolume = format('.4r'),
  formatPrice = format('.3r'),
  formatSpread = format('.2%'),
  formatPercentageChange = format('+.2%');

const COLUMNS = [
  {
    Header: 'Name',
    id: 'name',
    accessor: ({ tokenAddr, name }) => name || tokenAddr.slice(0, 8),
    Cell: ({ value }) => <span title={value}>{value}</span>,
    minWidth: 80,
  },
  {
    Header: 'Volume, Ξ',
    id: 'volume',
    accessor: ({ baseVolume, last, quoteVolume }) =>
      baseVolume != null && quoteVolume != null
        ? baseVolume + quoteVolume * last
        : null,
    Cell: ({ value }) => (value !== null ? formatVolume(value) : ''),
    className: 'text-center',
    minWidth: 85,
  },
  {
    Header: 'Bid',
    accessor: 'bid',
    Cell: ({ value }) => (value != null ? formatPrice(value) : ''),
    className: 'text-center',
    minWidth: 120,
  },
  {
    Header: 'Ask',
    accessor: 'ask',
    Cell: ({ value }) => (value != null ? formatPrice(value) : ''),
    className: 'text-center',
    minWidth: 120,
  },
  {
    Header: () => <abbr title="100% * (ask - bid) / ask">Spread, %</abbr>,
    id: 'spread',
    accessor: ({ ask, bid }) =>
      ask != null && bid != null ? (ask - bid) / ask : null,
    Cell: ({ value }) => (value !== null ? formatSpread(value) : ''),
    className: 'numeric-comparable',
    minWidth: 85,
  },
  {
    Header: 'Change',
    accessor: 'percentChange',
    Cell: ({ value }) =>
      value != null ? (
        <span
          title={`{value}%`}
          className={value >= 0 ? 'positive' : 'negative'}>
          {formatPercentageChange(value)}
        </span>
      ) : (
        ''
      ),
    className: 'percent-change numeric-comparable',
    minWidth: 85,
  },
];

const DEFAULT_SORT = [{ id: 'volume', desc: true }];

export default PairsTable;
