import React, { Component } from "react";
import "./css/mktdataboard.css";
import MarketDataTable from "./marketdataTable";
import { SearchMktCode } from "../utils/SearchMktCode";
import { MKTDATAMAP } from "../config/EquityCodeMap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AutocompleteBox from "./common/AutoCompleteBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

class MarketDataBoard extends Component {
  state = {
    dataSourceLst: [],
    searchQuery: "",
    currentPage: 1,
    shortlist: [],
    sortColumn: { path: "_id", order: "asc" },
    newMktItem: null,
  };

  constructor(props) {
    super(props);
    this.searchMktCode = null;
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
    const newShortListItems = this.searchMktCode.getSearchItems(query);
    const newShortList = newShortListItems.map(
      (item) => `${item._key_}:${item.value}`
    );
    const newMktItem =
      newShortListItems.length === 1 ? newShortListItems[0].value : null;

    this.setState({ shortlist: newShortList, newMktItem });
  };

  handleAddMarketData = () => {
    const { dataSourceLst, newMktItem } = this.state;
    dataSourceLst.push({ _id: newMktItem, price: newMktItem });
    console.log(dataSourceLst);
    this.setState({
      dataSourceLst,
      searchQuery: "",
      shortlist: [],
      newMktItem,
    });
  };

  async componentDidMount() {
    this.searchMktCode = new SearchMktCode(MKTDATAMAP);
  }

  render() {
    const { dataSourceLst, sortColumn, searchQuery, shortlist } = this.state;
    let count = dataSourceLst.length;

    let totalCount = count;

    return (
      <div className="mktdataboard-header">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <AutocompleteBox
                shortlist={shortlist}
                value={searchQuery}
                onChange={this.handleSearch}
              />
            </div>
            <div className="col-md-5">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleAddMarketData()}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {count === 0 && (
                <p className="m-5 "> Showing {totalCount} market data.</p>
              )}
              <MarketDataTable
                onSort={this.handleSort}
                sortColumn={sortColumn}
                dataSourceLst={dataSourceLst}
              ></MarketDataTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketDataBoard;
