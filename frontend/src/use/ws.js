import { useEffect, useState } from 'react';
import {WS} from '../api/ws';
import { useInterval } from './interval';

export function useWS() {
  const [ws,setWS] = useState(null);
  const [isWS, setIsWS] = useState(null);

  useEffect(() => {
    if(ws) {
      return;
    }
    setWS(WS.getInstance());
  }, []);

  useInterval(() => {
    if(ws && isWS !== ws.isWsReady) {
      setIsWS(ws.isWsReady);
    }
  }, 5);

  return {ws, isWS}
};