import * as React from "react";
import "./css/mktdataboard.css";
import MarketDataTable from "./marketdataTable";
import { SearchMktCode } from "../utils/SearchMktCode";
import { MKTDATAMAP } from "../config/EquityCodeMap";
import Button from "@material-ui/core/Button";

import AutocompleteBox from "./common/AutoCompleteBox";
import { Grid } from "@material-ui/core";

export default function MarketDataBoard() {
  const [datasourceList, setDataSourceList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [shortlist, setShortlist] = React.useState([]);
  const [newItems, setNewItems] = React.useState([]);
  const [searhMktCode, setSearchMktCode] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setSearchMktCode(new SearchMktCode(MKTDATAMAP));
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newShortListItems = searhMktCode.getSearchItems(query);
    setShortlist(
      newShortListItems.map((item) => `${item._key_}:${item.value}`)
    );
    setNewItems(newShortListItems);
  };

  const handleAddMarketData = () => {
    if (newItems.length !== 1) {
      return;
    }
    const item = newItems[0];

    const data = datasourceList;
    data.push({ _id: item.value, price: item._key_ });
    setDataSourceList(data);
    setSearchQuery("");
    setShortlist([]);
  };

  if (!searhMktCode) {
    return "loading";
  }

  const count = datasourceList ? datasourceList.length : 0;

  return (
    <>
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid container spacing={4} justify="center" alignItems="center">
          <Grid item xs={6}>
            <AutocompleteBox
              shortlist={shortlist}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddMarketData()}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          {count === 0 && <p className="m-5 ">Showing {count} market data.</p>}
        </Grid>
        <Grid item xs={8}>
          <MarketDataTable dataSourceLst={datasourceList} />
        </Grid>
      </Grid>
    </>
  );
}
