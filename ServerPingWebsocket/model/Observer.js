class MktDataObserver {
  constructor(clientId, consumerFunc, throwFunc) {
    this.clientId = clientId;
    this.consumerFunc = consumerFunc;
    this.throwFunc = throwFunc;
  }

  update(msg) {
    this.consumerFunc(msg);
  }

  throwFunc(throwable) {
    this.throwFunc(throwable);
  }
}
module.exports = {
  MktDataObserver,
};
