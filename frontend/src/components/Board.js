import { useBoard } from '../use/board';
import './Board.css';

export function Board() {

  const {map, handleClear, handleStep} = useBoard();

  return (
  <div className="box">
    <div className="controls">
      <div className="clear" onClick={handleClear}>Clear</div>
    </div>
    <div className="board">
      <ul className="map">
        { 
        map && map.map((field, idx) => (
          <li key={idx} className="cell">
            { field === ''
              ? <button className='btn-cell' onClick={() => handleStep(idx)}>{field}</button>
              : (field === 'X' ? <div className='field'><img src={require("../img/x.png")}/></div> : <div className='field'><img src={require("../img/o.png")}/></div>)
            }
          </li>
        ))
        }
      </ul>
    </div>
  </div>);
}