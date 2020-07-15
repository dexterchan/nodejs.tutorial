import React, { Component } from "react";

import Table from "./common/table";
import AsyncSubsribeField from "./asyncSubscribeField";

class MarketDataTable extends Component {
  rounding = 2;
  columns = [
    { path: "_id", label: "Identifier" },
    {
      path: "price",
      label: "Bid/Ask",
      content: (sec) => <AsyncSubsribeField mktCode={sec._id} />,
    },
  ];
  constructor(props) {
    super(props);
  }
  render() {
    const { dataSourceLst, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={dataSourceLst}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MarketDataTable;
