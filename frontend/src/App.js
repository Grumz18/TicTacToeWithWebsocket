import { Board } from "./components/Board";
import { CloseButton } from "./components/CloseButton";
import { ConnectButton } from "./components/ConnectButton";
import { PingButton } from "./components/PingButton";

function App() {
  return (
    <>
      <div>
        <ConnectButton />
        <PingButton />
        <CloseButton />
      </div>
      <div>
        <Board />
      </div>
    </>
  );
}

export default App;
