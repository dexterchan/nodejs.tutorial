import React, { Component } from "react";

import { connectMktClient } from "../services/connectMktData";
import {
  mktdataserverhostname,
  mktdataserverport,
} from "../config/systemconfig";
class AsyncSubsribeField extends Component {
  rounding = 2;
  state = {
    myValue: "",
  };
  updateStateValue(mktValue) {
    console.log(mktValue);
    const { Bid, Ask } = mktValue;
    const value = Bid.toFixed(this.rounding) + "/" + Ask.toFixed(this.rounding);
    this.setState({ myValue: value });
  }
  async componentDidMount() {
    const { mktCode } = this.props;
    await connectMktClient(
      mktdataserverhostname,
      mktdataserverport,
      mktCode,
      (data) => this.updateStateValue(data)
    );
  }

  render() {
    const { myValue } = this.state;
    return <React.Fragment>{myValue}</React.Fragment>;
  }
}

export default AsyncSubsribeField;
