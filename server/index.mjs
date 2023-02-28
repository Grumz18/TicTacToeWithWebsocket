import { createServer } from "http";
import { createServer as createSocketServer } from "sockjs";
import { Board } from './lib/board.mjs';

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
          handlePing(connection);
          break;
        case 'firstStep':
          handleFirstStep(connection, parsedData.payLoad);
          break;
        case 'step':
          handleStep(connection, parsedData.payLoad);
          break;
        case 'clearBoard':
          handleClear();
          break;
        case 'getBoardState':
          handleGetBoardState(connection);
          break;
        default:
          handleDefault(connection);
      }
    } catch (e) {

    }
  });
});

socketServer.installHandlers(httpServer);
httpServer.listen(PORT);

function handlePing(connection) {
  connection.write(JSON.stringify({ type: 'pong' }));
}

function handleDefault(connection) {
  connection.write(JSON.stringify({ type: 'unknown' }));
}

function handleFirstStep(connection, payLoad) {
  const board = Board.getInstance();
  const { result } = board?.firstStep(payLoad);
  const boardStatus = board?.getCurrentGameState();

  if(result) {
    const message = JSON.stringify({ type: 'firstStepIsHappen', payLoad: boardStatus });
    poolOfClient.forEach(conn => conn.write(message));
  } else {
    const message = JSON.stringify({ type: 'yourFirstStepIsFailed', payLoad: boardStatus });
    connection.write(message)
  }
}

function handleStep(connection, payLoad) {
  const board = Board.getInstance();
  const { result } = board?.step(payLoad);
  const boardStatus = board?.getCurrentGameState();

  if(result) {
    const message = JSON.stringify({ type: 'stepIsHappen', payLoad: boardStatus });
    poolOfClient.forEach(conn => conn.write(message));
  } else {
    const message = JSON.stringify({ type: 'yourStepIsFailed', payLoad: boardStatus });
    connection.write(message)
  }
}

function handleClear() {
  const board = Board.getInstance();

  board?.clear();

  const message = JSON.stringify({ type: "mapIsCleared", payLoad: board?.getCurrentGameState()})
  poolOfClient.forEach(conn => conn.write(message));
}

function handleGetBoardState(connection) {
  const board = Board.getInstance();

  connection.write(JSON.stringify({ type: 'boardState', payLoad: board?.getCurrentGameState() }));
}