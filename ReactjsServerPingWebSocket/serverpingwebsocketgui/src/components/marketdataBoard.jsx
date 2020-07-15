import * as React from 'react';
import './css/mktdataboard.css';
import MarketDataTable from './marketdataTable';
import { SearchMktCode } from '../utils/SearchMktCode';
import { MKTDATAMAP } from '../config/EquityCodeMap';
import Button from '@material-ui/core/Button';

import AutocompleteBox from './common/AutoCompleteBox';
import { Grid } from '@material-ui/core';

export default function MarketDataBoard() {
  const [datasourceList, setDataSourceList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortlist, setShortlist] = React.useState([]);
  const [sortColumn, setSortColumn] = React.useState({
    path: '_id',
    order: 'asc',
  });
  const [newMktItem, setNewMktItem] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setNewMktItem(new SearchMktCode(MKTDATAMAP));
    };

    fetchData();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newShortListItems = newMktItem.getSearchItems(query);
    setShortlist(newShortListItems.map((item) => `${item._key_}:${item.value}`));
  };

  const handleAddMarketData = () => {
    const item = newMktItem.getSearchItems(searchQuery);
    if (item.length !== 1) {
      return;
    }

    const data = datasourceList;
    data.push({ _id: item[0].value, price: item[0]._key_ });
    setDataSourceList(data);
    setSearchQuery(item.value);
    setShortlist([]);
  };

  if (!newMktItem) {
    return 'loading';
  }

  const count = datasourceList ? datasourceList.length : 0;

  return (
    <>
      <Grid container spacing={5} direction='column' alignItems='center' justify='center'>
        <Grid container spacing={5} justify='center' alignItems='center'>
          <Grid item xs={6}>
            <AutocompleteBox shortlist={shortlist} value={searchQuery} onChange={handleSearch} />
          </Grid>
          <Grid item xs={1}>
            <Button variant='contained' color='primary' onClick={() => handleAddMarketData()}>
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid item>{count === 0 && <p className='m-5 '>Showing {count} market data.</p>}</Grid>
        <Grid item>
          <MarketDataTable
            onSort={handleSort}
            sortColumn={sortColumn}
            dataSourceLst={datasourceList}
          />
        </Grid>
      </Grid>
    </>
  );
}
