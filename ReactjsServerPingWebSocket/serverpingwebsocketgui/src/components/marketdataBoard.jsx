import React, { Component } from "react";
import "./css/mktdataboard.css";
import MarketDataTable from "./marketdataTable";
import SearchBox from "./common/searchbox";

class MarketDataBoard extends Component {
  state = {
    dataSourceLst: [],
    searchQuery: "",
    currentPage: 1,
    sortColumn: { path: "_id", order: "asc" },
  };

  constructor(props) {
    super(props);
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  async componentDidMount() {
    const mktdataList = [
      "AAPL 150117C00600000 EQUITY",
      "AMZN 150117C00600000 EQUITY",
    ];
    const dataSourceLst = mktdataList.map((name) => {
      const obj = { _id: name, price: name };
      return obj;
    });
    this.setState({ dataSourceLst });
  }

  render() {
    const { dataSourceLst, sortColumn } = this.state;
    let count = dataSourceLst.length;
    /*
    if (count === 0)
      return (
        <p className="mktdataboard-header">
          There are no market data to display.
        </p>
      );*/
    let totalCount = count;

    return (
      <div className="mktdataboard-header">
        <div className="container">
          <div className="row">
            <div className="col-2">Market Code:</div>
            <div className="col">
              <SearchBox />
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
