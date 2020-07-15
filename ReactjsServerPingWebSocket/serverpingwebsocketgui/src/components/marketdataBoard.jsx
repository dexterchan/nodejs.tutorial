import * as React from 'react';
import './css/mktdataboard.css';
import MarketDataTable from './marketdataTable';
import { SearchMktCode } from '../utils/SearchMktCode';
import { MKTDATAMAP } from '../config/EquityCodeMap';
import Button from '@material-ui/core/Button';

import AutocompleteBox from './common/AutoCompleteBox';
import { Grid } from '@material-ui/core';

const handleItem = (state, event) => {
  switch (event.type) {
    case 'add':
      state.push(event.payload);
      return state;
    case 'remove':
      return state.filter((item) => item._id !== event.payload);
    default:
      return state;
  }
};

export default function MarketDataBoard() {
  const [datasourceList, dispatch] = React.useReducer(handleItem, []);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortlist, setShortlist] = React.useState([]);
  const [newMktItem, setNewMktItem] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      setNewMktItem(new SearchMktCode(MKTDATAMAP));
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newShortListItems = newMktItem.getSearchItems(query);
    setShortlist(newShortListItems.map((item) => `${item._key_}:${item.value}`));
  };

  const handleAddMarketData = () => {
    console.log(searchQuery);
    const item = newMktItem.getSearchItems(searchQuery);
    if (item.length !== 1) {
      return;
    }

    dispatch({
      type: 'add',
      payload: { _id: item[0].value, price: item[0]._key_ },
    });
    setSearchQuery('');
    setShortlist([]);

    console.log(datasourceList);
  };

  if (!newMktItem) {
    return 'loading';
  }

  const count = datasourceList ? datasourceList.length : 0;

  return (
    <>
      <Grid container spacing={4} direction='column' alignItems='center' justify='center'>
        <Grid container spacing={4} justify='center' alignItems='center'>
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
        <Grid item xs={8}>
          <MarketDataTable
            dataSourceLst={datasourceList}
            onRemoveClick={(elementId) => {
              dispatch({
                type: 'remove',
                payload: elementId,
              });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
