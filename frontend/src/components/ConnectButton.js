import { useWS } from "../use/ws";


export function ConnectButton() {
  const {ws, isWS} = useWS();

  function handleClick() {
    ws?.connect();
  }

  return(
    <button onClick={handleClick} disabled={isWS}>Connect</button>
  )
}