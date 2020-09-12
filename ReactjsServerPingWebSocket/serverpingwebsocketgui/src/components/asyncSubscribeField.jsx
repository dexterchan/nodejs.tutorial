import React, { Component } from "react";

//import { connectMktClient } from "../services/connectMktData";
import { connectMktClient } from "../services/connectMktData_Stomp";
import connectSetting from "../config/GetSystemConfig";
import _ from "lodash";

class AsyncSubsribeField extends Component {
  rounding = 4;
  _isMounted = false;
  vssocket = undefined;
  state = {
    myValue: "",
    remainTime: "",
  };
  Bid = "-";
  Ask = "-";
  expDate = null;
  timer = null;

  updateStateValue(mktCode, rawMktValue) {
    const mktValue =
      typeof rawMktValue == "string" ? JSON.parse(rawMktValue) : rawMktValue;

    //console.log(`${mktCode}:` + JSON.stringify(mktValue));

    const { valuesMap } = mktValue;
    if ("BID" in valuesMap) {
      this.Bid = valuesMap["BID"].toFixed(this.rounding);
    }
    if ("ASK" in valuesMap) {
      this.Ask = valuesMap["ASK"].toFixed(this.rounding);
    }
    const value = this.Bid + "/" + this.Ask;
    this.setState({ myValue: value });
  }
  async componentDidMount() {
    this._isMounted = true;
    const {
      protocol,
      mktdataserverhostname,
      mktdataserverport,
      path,
    } = connectSetting;

    const { mktCode, apiKeyValue } = this.props;

    const { stompClient, expDate } = await connectMktClient(
      protocol,
      mktdataserverhostname,
      mktdataserverport,
      path,
      apiKeyValue,
      mktCode,
      (data) => {
        if (this._isMounted) {
          this.updateStateValue(mktCode, data);
        }
      }
    );
    this.vssocket = stompClient;
    this.expDate = expDate;
    this.timer = setInterval(this.getRemainTimeFunc, 1000);
  }

  getRemainTimeFunc = () => {
    let remainTime = Math.floor(this.expDate - new Date().getTime() / 1000);
    if (remainTime <= 0) {
      clearInterval(this.timer);
      remainTime = 0;
    }
    const seconds = remainTime % 60;
    const hours = Math.floor(remainTime / 60);
    const timeText = hours > 0 ? `${hours}h${seconds}s` : `${seconds}s`;
    this.setState({ remainTime: timeText });
  };
  getRemainTime() {}

  componentWillUnmount() {
    //const { mktCode } = this.props;
    //console.log(`disconnect ${mktCode}`);
    this._isMounted = false;
    if (!_.isUndefined(this.vssocket)) this.vssocket.disconnect();
  }

  render() {
    const { myValue, remainTime } = this.state;
    return (
      <React.Fragment>
        {myValue} ({remainTime})
      </React.Fragment>
    );
  }
}

export default AsyncSubsribeField;
