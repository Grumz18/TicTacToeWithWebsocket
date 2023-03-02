import SockJsClient from 'sockjs-client';

const SOCKET_SERVER = 'http://localhost:5000';

export class WS {
  static instance;

  wsConnect = null;
  isWsReady = false;

  listnerRegistry = {
    close: [],
    message: [],
  }

  subscribeClose(handler) {
    this.listnerRegistry.close = [...this.listnerRegistry.close, handler];

    return () => this.listnerRegistry.close = this.listnerRegistry.close.filter(h => h !== handler);
  }

  subscribeMessage(handler) {
    this.listnerRegistry.message = [...this.listnerRegistry.message, handler];

    return () => this.listnerRegistry.message = this.listnerRegistry.message.filter(h => h !== handler);
  }

  send(message) {
    if(this.wsConnect) {
      this.wsConnect.send(message);
    }
  }

  close() {
    if(this.wsConnect) {
      this.wsConnect.close();
      this.wsConnect = null;
      this.isWsReady = false;
    }
  }

  constructor() {
    this.connect();
  };

  static getInstance() {
    if(!WS.instance){
      WS.instance = new WS();
    }
    return WS.instance;
  }

  connect() {
    if(!this.wsConnect) {
      const tempWS = SockJsClient(SOCKET_SERVER);

      tempWS.onclose = (ev) => {
        this.listnerRegistry.close.forEach(l => l(ev))
      }
      this.waitSocketIsReady(tempWS);
    }
  }

  waitSocketIsReady(tempWS) {
    setTimeout(() => {
      if(tempWS.readyState === 1) {
        this.wsConnect = tempWS;
        this.isWsReady = true;
      } else {
        this.waitSocketIsReady(tempWS);
      }
    }, 5)
  }

};