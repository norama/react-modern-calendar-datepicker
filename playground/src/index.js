import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return <DatePicker value={selectedDay} onChange={setValue} shouldHighlightWeekends />;
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
        onChange={setSelectedDayRange}
        numberOfMonths={3}
        minimumDate={{year: 2020, month: 11, day: 1}}
        maximumDate={{year: 2021, month: 8, day: 1}}
        shouldHighlightWeekends
      />
    );
  };

ReactDOM.render(<AppRange />, document.getElementById('root'));
serviceWorker.unregister();
