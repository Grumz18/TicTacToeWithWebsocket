import { useEffect, useState } from 'react';
import {WS} from '../api/ws';
import { useInterval } from './interval';

export function useWS() {
  const [ws, setWS] = useState(null);
  const [isWS, setisWS] = useState(null);

  useEffect(() => {
    if(ws) {
      return;
    }
    setWS(WS.getInstance());
  },[]);

  useInterval(() => {
    if(ws && isWS !== ws.isWSReady) {
      setisWS(ws.isWSReady);
    }
  }, 5);
  return {ws, isWS};
};