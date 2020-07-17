import React, { Component } from 'react';

import { connectMktClient } from '../services/connectMktData';

import connectSetting from '../config/GetSystemConfig';

class AsyncSubsribeField extends Component {
  rounding = 2;
  _isMounted = false;
  state = {
    myValue: '',
  };
  updateStateValue(mktValue) {
    const { Bid, Ask } = mktValue;
    const value = Bid.toFixed(this.rounding) + '/' + Ask.toFixed(this.rounding);
    this.setState({ myValue: value });
  }
  async componentDidMount() {
    this._isMounted = true;
    const { protocol, mktdataserverhostname, mktdataserverport } = connectSetting;

    const { mktCode } = this.props;
    await connectMktClient(protocol, mktdataserverhostname, mktdataserverport, mktCode, (data) => {
      if (this._isMounted) {
        this.updateStateValue(data);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { myValue } = this.state;
    return <React.Fragment>{myValue}</React.Fragment>;
  }
}

export default AsyncSubsribeField;
