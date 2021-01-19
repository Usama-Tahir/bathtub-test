import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // keep track of water level
  const [waterLevel, setWaterlevel] = useState(0);
  // check if water level is increasing or decreasing.
  const [waterFlow, setWaterFlow] = useState(null);
  // keep track of current interval id.
  const [clearintervalId, setClearIntervalId] = useState(null);

  useEffect(() => {
    // we check if water bath tub is filled or empty and clear interval.
    const condition = (waterFlow && waterFlow === 'up' && waterLevel === 5) || (waterFlow && waterFlow === 'down' && waterLevel === 0);
    if (condition) {
      clearInterval(clearintervalId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterLevel, waterFlow]);

  const increaseWaterLevel = () => {
    setWaterFlow('up');
    clearInterval(clearintervalId);
    // don't set up time interval if water level is already 5.
    if (waterLevel === 5) {
      return;
    }
    const intervalId = setInterval(() => {
      setWaterlevel(prevWater => prevWater + 1);
    }, 2000);
    setClearIntervalId(intervalId);
  };

  const decreaseWaterLevel = () => {
    clearInterval(clearintervalId);
    setWaterFlow('down');
    // don't set down time interval if water level is already 0.
    if (waterLevel === 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setWaterlevel(prevWater => prevWater - 1);
    }, 2000);
    setClearIntervalId(intervalId);
  };
  return (
    <div className='app-container'>
      <div className="btn-container">
        <button className="button" onClick={increaseWaterLevel}>+</button>
        <button className="button" onClick={decreaseWaterLevel}>-</button>
      </div>
      {waterLevel === 5 && <div className="danger">Oh No! Water overflow</div>}
      <div className='water-level-display-container'>
        {[...Array(waterLevel)].map((e, i) => <div className="water-level-display-children">{waterLevel - i}</div>)
}
      </div>
    </div>
  );
}

export default App;
