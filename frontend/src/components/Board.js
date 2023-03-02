import './Board.css';

export function Board() {
  return (  <div className="box">
    <div className="controls">
      <button className="clear">Clear</button>
    </div>
    <div className="board">
      <ul className="map">
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
        <li className="cell"></li>
      </ul>
    </div>
  </div>);
}