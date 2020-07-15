import * as React from 'react';

import AsyncSubsribeField from './asyncSubscribeField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

import { TableSortLabel } from '@material-ui/core';
import MarketDataTableCell from './marketDataTableCell/MarketDataTableCell';

export default function MarketDataTable({ dataSourceLst }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('_id');

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { path: '_id', label: 'Identifier' },
    {
      path: 'price',
      label: 'Bid/Ask',
      content: (sec) => <AsyncSubsribeField mktCode={sec._id} />,
    },
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // we make two assumptions here for building the keys:
  // - the data has a _id field in order to build the keys.
  // - we don't have two or more columns with the same path
  // todo: stop doing this

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' size='small'>
        <TableHead>
          <TableRow key='header'>
            {columns.map((column) => (
              <TableCell key={`header-${column.path}`}>
                <TableSortLabel
                  active={orderBy === column.path}
                  direction={orderBy === column.path ? order : 'asc'}
                  onClick={createSortHandler(column.path)}
                >
                  {column.label}
                  {orderBy === column.path ? (
                    <span hidden>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(dataSourceLst, getComparator(order, orderBy)).map((item) => (
            <TableRow key={item._id}>
              {columns.map((column) => (
                <MarketDataTableCell item={item} column={column} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
