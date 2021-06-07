import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
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
    return (
      <DatePicker
        value={selectedDayRange}
        onChange={(v) => {console.log(v); setSelectedDayRange(v);}}
        numberOfMonths={3}
        minimumDate={{year: 2020, month: 11, day: 8}}
        maximumDate={{year: 2021, month: 6, day: 5}}
        shouldHighlightWeekends
      />
    );
  };

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
