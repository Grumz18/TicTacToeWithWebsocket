import { useWS } from "../use/ws";


function ConnectButton() {
  const {ws, isWS} = useWS();

  function handleClick() {
    ws?.connect();
  }

  return(
    <button onClick={handleClick} disabled={isWS}>Connect</button>
  )
}

export default ConnectButton;