import SockJsClient from 'sockjs-client';

const SOCKET_SERVER = 'http://localhost:5000'

export class WS {
    static instance;
    wsConnect = null;
    isWSReady = false;

    listenerRegistry = {
        close: [],
        message: [],
    }

    subscribeClose(handler) {
        this.listenerRegistry.close = [...this.listenerRegistry.close, handler];
        return () => {
            this.listenerRegistry.close = this.listenerRegistry.close.filter(h => h !== handler);
        }
    }

    subscribeMessage(handler) {
        this.listenerRegistry.message = [...this.listenerRegistry.message, handler];
        return () => {
            this.listenerRegistry.message = this.listenerRegistry.message.filter(h => h !== handler);
        }
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
            this.isWSReady = false;
        }
    }

    constructor() {
        this.connect();
    }

    static getInstance() {
        if(!WS.instance) {
            WS.instance = new WS();
        }
        return WS.instance;
    }

    connect() {
        if(!this.wsConnect) {
            const tempWS = SockJsClient(SOCKET_SERVER);

            tempWS.onclose = (ev) => {
                this.listenerRegistry.close.forEach(l => l(ev));
            }

            tempWS.onmessage = (ev) => {
                this.listenerRegistry.message.forEach(l => l(ev));
            }
            
            this.waitSocketIsReady(tempWS);
        }
    }

    waitSocketIsReady(tempWS) {
        setTimeout(() => {
            if(tempWS.readyState === 1) {
                this.wsConnect = tempWS;
                this.isWSReady = true;
            } else {
                this.waitSocketIsReady(tempWS);
            }
        }, 5);
    }
}