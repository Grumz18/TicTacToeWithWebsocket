import { useWS } from "../use/ws";


export function PingButton() {
  const {ws, isWS} = useWS();

  function handleClick() {
    ws?.send(JSON.stringify({ type: 'ping' }));
  }

  return(
    <button onClick={handleClick} disabled={!isWS}>Ping</button>
  )
}