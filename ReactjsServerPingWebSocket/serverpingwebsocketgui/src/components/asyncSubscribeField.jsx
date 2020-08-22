import React, { Component } from "react";

//import { connectMktClient } from "../services/connectMktData";
import { connectMktClient } from "../services/connectMktData_Stomp";
import connectSetting from "../config/GetSystemConfig";
import _ from "lodash";

class AsyncSubsribeField extends Component {
  rounding = 2;
  _isMounted = false;
  vssocket = undefined;
  state = {
    myValue: "",
  };
  updateStateValue(mktCode, rawMktValue) {
    const mktValue =
      typeof rawMktValue == "string" ? JSON.parse(rawMktValue) : rawMktValue;

    //console.log(`${mktCode}:` + JSON.stringify(rawMktValue));
    const { Bid, Ask } = mktValue;
    if (Bid !== undefined && Ask !== undefined) {
      const value =
        Bid.toFixed(this.rounding) + "/" + Ask.toFixed(this.rounding);
      this.setState({ myValue: value });
    } else {
      const mkt = JSON.parse(mktValue);
      console.log("invalid result" + typeof mktValue);
      console.log(mkt.Bid);
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    const {
      protocol,
      mktdataserverhostname,
      mktdataserverport,
      path,
    } = connectSetting;

    const { mktCode } = this.props;
    this.vssocket = await connectMktClient(
      protocol,
      mktdataserverhostname,
      mktdataserverport,
      path,
      mktCode,
      (data) => {
        if (this._isMounted) {
          this.updateStateValue(mktCode, data);
        }
      }
    );
  }

  componentWillUnmount() {
    //const { mktCode } = this.props;
    //console.log(`disconnect ${mktCode}`);
    this._isMounted = false;
    if (!_.isUndefined(this.vssocket)) this.vssocket.disconnect();
  }

  render() {
    const { myValue } = this.state;
    return <React.Fragment>{myValue}</React.Fragment>;
  }
}

export default AsyncSubsribeField;
