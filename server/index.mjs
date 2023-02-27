import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";

const PORT = 5000;
const httpServer = createServer();
const socketServer = createSocketServer();

let poolOfClient = [];

socketServer.on('connection', connection => {
  poolOfClient = [...poolOfClient, connection];
  connection.on("close", () => {
    poolOfClient = poolOfClient.filter(c => c !== connection);
  });

  connection.on('data', msg => {
    try {
      const parsedData = JSON.parse(msg);
      switch (parsedData.type) {
        case 'ping':
          connection.write('pong');
        break;
        default:
          connection.write('unknown type');
        break;
      }
    } catch (e) {

    }
  });
});

socketServer.installHandlers(httpServer);
httpServer.listen(PORT);