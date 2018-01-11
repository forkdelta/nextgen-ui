import React from 'react';
import ReactTable from 'react-table';

import './PairsTable.css';

function PairsTable({ pairs, lastUpdated, style = {}, className = null }) {
  return (
    <ReactTable
      data={Object.values(pairs)}
      minRows={10}
      defaultSorted={DEFAULT_SORT}
      columns={COLUMNS}
      defaultPageSize={100}
      showPagination={false}
      style={style}
      className={`-striped -highlight ${!!className ? className : ''}`}
    />
  );
}

const COLUMNS = [
  {
    Header: 'Name',
    id: 'name',
    accessor: d => d.name.replace('ETH_', ''),
    minWidth: 75,
  },
  {
    Header: 'Volume',
    id: 'baseVolume',
    accessor: d => Math.round(100 * d.baseVolume || 0.0) / 100,
    minWidth: 75,
  },
  {
    Header: 'Bid',
    accessor: 'bid',
    minWidth: 75,
  },
  {
    Header: 'Ask',
    accessor: 'ask',
    minWidth: 75,
  },
  {
    Header: 'Change',
    accessor: 'percentChange',
    Cell: ({ value }) => <span>{value ? `${value}%` : ''}</span>,
    minWidth: 75,
  },
];

const DEFAULT_SORT = [{ id: 'baseVolume', desc: true }];

export default PairsTable;
