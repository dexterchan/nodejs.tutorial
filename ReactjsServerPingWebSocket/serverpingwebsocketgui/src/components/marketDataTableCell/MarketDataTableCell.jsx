import * as React from 'react';
import _ from 'lodash';
import TableCell from '@material-ui/core/TableCell';

export default function MarketDataTableCell({ item, column }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return <TableCell key={createKey(item, column)}>{renderCell(item, column)}</TableCell>;
}
