import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import { Calendar } from '../../src/Calendar';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  const customClassName = 'myCustomDayClassName';
  const customDayToAddClass = { year: 2020, month: 3, day: 5 };
  return (
    <DatePicker
        onChange={setValue}
        value={{ year: 2020, month: 3, day: 1 }}
        customDaysClassName={[{ ...customDayToAddClass, className: customClassName }]}
    />
  );
};

const AppRange = () => {
    // ✅ a change in default state: { from: ..., to: ... }
    const [selectedDayRange, setSelectedDayRange] = useState({
      from: null,
      to: null
    });
    const computeActiveDateRef = useRef(null);

    const handleClick = () => {
        if (computeActiveDateRef.current) {
            computeActiveDateRef.current(/* { year: 1980, month: 1, day: 5 } */);
        }
    };

    return (
      <div style={{ width: '100%' }}>
        <Calendar
            value={selectedDayRange}
            computeActiveDateRef={computeActiveDateRef}
            onChange={(v) => {console.log(v); setSelectedDayRange(v);}}
            numberOfMonths={3}
            minimumDate={{year: 2018, month: 11, day: 8}}
            maximumDate={{year: 2021, month: 6, day: 5}}
            shouldHighlightWeekends
        />
        <div style={{ margin: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button style={{ padding: '5px', cursor: 'pointer' }} onClick={handleClick}>Recalc</button>
        </div>
      </div>
    );
  };

ReactDOM.render(<AppRange />, document.getElementById('root'));
serviceWorker.unregister();
