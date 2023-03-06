import { useBoard } from '../use/board';
import './Board.css';

export function Board() {

  const {map, handleClear, handleStep} = useBoard();

  return (  <div className="box">
    <div className="controls">
      <button className="clear" onClick={handleClear}>Clear</button>
    </div>
    <div className="board">
      <ul className="map">
        { map && map.map((field, idx) => (
          <li key={idx} className="cell">
            { field === 'None'
              ? <button onClick={() => handleStep(idx)}>{field}</button>
              : <>{field}</>
            }
          </li>
        ))}
      </ul>
    </div>
  </div>);
}