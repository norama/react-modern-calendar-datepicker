import React, { useState, useRef, useEffect } from 'react';

import { getDateAccordingToMonth, getDeltaMonth, getCalendarMonths, shallowClone, getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

import CalendarMonth from './components/CalendarMonth';

const Calendar = ({
  value,
  onChange,
  onDisabledDayError,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  numberOfMonths,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
}) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
  });

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };

    /* istanbul ignore else */
    if (calendarElement.current !== null) {
      calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    }

    return () => {
      /* istanbul ignore else */
      if (calendarElement.current !== null) {
        calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
      }
    };
  }, [calendarElement]);

  const { getToday, toDayInRange, isBeforeDate } = useLocaleUtils(locale);
  const { weekDays: weekDaysList, isRtl } = useLocaleLanguage(locale);
  const today = getToday();

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    let v;
    if (valueType === TYPE_MUTLI_DATE && value.length) v = value[0];
    if (valueType === TYPE_SINGLE_DATE && value) v = value;
    if (valueType === TYPE_RANGE && value.from) v = value.from;
    v = v || toDayInRange(shallowClone(today), minimumDate, maximumDate);
    while (isBeforeDate(maximumDate, getDeltaMonth(v, numberOfMonths - 1))) {
        v = getDeltaMonth(v, -1);
    }
    return v;
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const weekdays = weekDaysList.map(weekDay => (
    <abbr key={weekDay.name} title={weekDay.name} className="Calendar__weekDay">
      {weekDay.short}
    </abbr>
  ));

  const handleChange = (value) => {
    setMainState({
      ...mainState,
      activeDate
    });
    onChange(value);
  };

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection),
      monthChangeDirection: '',
    });
  };

  const selectMonth = (newMonthNumber, delta) => {
    setMainState({
      ...mainState,
      activeDate: getDeltaMonth({
                        ...getDeltaMonth(activeDate, delta),
                        month: newMonthNumber
                    }, -delta),
    });
  };

  const selectYear = (newYearNumber, delta) => {
    setMainState({
      ...mainState,
      activeDate: getDeltaMonth(
                    toDayInRange({
                        ...getDeltaMonth(activeDate, delta),
                        year: newYearNumber
                    }, minimumDate, maximumDate),
                    -delta)
    });
  };

  const months = getCalendarMonths(activeDate, numberOfMonths);
  const minimumMonths = months.map((month, index) => (
    minimumDate ? getDeltaMonth(minimumDate, index) : null
  ));
  const maximumMonths = months.map((month, index) => (
    maximumDate ? getDeltaMonth(maximumDate, index - numberOfMonths + 1) : null
  ));

  return (
    <div
      className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
      role="grid"
      style={{
        '--cl-color-primary': colorPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
        '--animation-duration': slideAnimationDuration,
      }}
      ref={calendarElement}
    >

      <div className="Calendar__months">

        { months.map((month, index) => (
            <CalendarMonth
                key={index}
                value={value}
                date={month}
                onChange={handleChange}
                onYearSelect={(newYearNumber) => selectYear(newYearNumber, index)}
                onMonthSelect={(newMonthNumber) => selectMonth(newMonthNumber, index)}
                onMonthChange={handleMonthChange}
                monthChangeDirection={mainState.monthChangeDirection}
                onUpdateDate={index === 0 ? updateDate : undefined}
                weekdays={weekdays}
                calendarTodayClassName={calendarTodayClassName}
                calendarSelectedDayClassName={calendarSelectedDayClassName}
                calendarRangeStartClassName={calendarRangeStartClassName}
                calendarRangeBetweenClassName={calendarRangeBetweenClassName}
                calendarRangeEndClassName={calendarRangeEndClassName}
                disabledDays={disabledDays}
                onDisabledDayError={onDisabledDayError}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                isFirst={index === 0}
                isLast={index === months.length - 1}
                minimumMonth={minimumMonths[index]}
                maximumMonth={maximumMonths[index]}
                selectorStartingYear={selectorStartingYear}
                selectorEndingYear={selectorEndingYear}
                locale={locale}
                shouldHighlightWeekends={shouldHighlightWeekends}
                customDaysClassName={customDaysClassName}
            />

        ))}

      </div>

      <div className="Calendar__footer">{renderFooter()}</div>
    </div>
  );
};

Calendar.defaultProps = {
  numberOfMonths: 1,
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'en',
  value: null,
  renderFooter: () => null,
  customDaysClassName: [],
};

export { Calendar };
