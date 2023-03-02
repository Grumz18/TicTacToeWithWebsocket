import { useWS } from '../use/ws';


function CloseButton() {
  const {ws, isWS} = useWS();

  function handleClick() {
    ws?.close();
  }

  return(
    <button onClick={handleClick} disabled={!isWS}>Close</button>
  )
}

export default CloseButton;