import React, { useState } from 'react';

import { Header, MonthSelector, YearSelector, DaysList } from '.';

const CalendarMonth = ({
    value,
    date,
    onChange,
    onYearSelect,
    onMonthSelect,
    onMonthChange,
    monthChangeDirection,
    onUpdateDate,
    weekdays,
    calendarTodayClassName,
    calendarSelectedDayClassName,
    calendarRangeStartClassName,
    calendarRangeBetweenClassName,
    calendarRangeEndClassName,
    disabledDays,
    onDisabledDayError,
    minimumDate,
    maximumDate,
    selectorStartingYear,
    selectorEndingYear,
    locale,
    shouldHighlightWeekends,
    customDaysClassName,
}) => {
    const [isYearSelectorOpen, setYearSelectorOpen] = useState(false);
    const [isMonthSelectorOpen, setMonthSelectorOpen] = useState(false);

    const toggleYearSelector = () => setYearSelectorOpen((o) => !o);
    const toggleMonthSelector = () => setMonthSelectorOpen((o) => !o);

    const handleYearSelect = (yearNumber) => {
        setYearSelectorOpen(false);
        onYearSelect(yearNumber);
    }
    const handleMonthSelect = (monthNumber) => {
        setMonthSelectorOpen(false);
        onMonthSelect(monthNumber);
    }

    return (

        <div className="Calendar__month">
            <Header
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                activeDate={date}
                onMonthChange={onMonthChange}
                onMonthSelect={toggleMonthSelector}
                onYearSelect={toggleYearSelector}
                monthChangeDirection={monthChangeDirection}
                isMonthSelectorOpen={isMonthSelectorOpen}
                isYearSelectorOpen={isYearSelectorOpen}
                locale={locale}
            />

            <MonthSelector
                isOpen={isMonthSelectorOpen}
                activeDate={date}
                onMonthSelect={handleMonthSelect}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <YearSelector
                isOpen={isYearSelectorOpen}
                activeDate={date}
                onYearSelect={handleYearSelect}
                selectorStartingYear={selectorStartingYear}
                selectorEndingYear={selectorEndingYear}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <div className="Calendar__weekDays">{weekdays}</div>

            <DaysList
                activeDate={date}
                value={value}
                monthChangeDirection={monthChangeDirection}
                onSlideChange={onUpdateDate}
                disabledDays={disabledDays}
                onDisabledDayError={onDisabledDayError}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={onChange}
                calendarTodayClassName={calendarTodayClassName}
                calendarSelectedDayClassName={calendarSelectedDayClassName}
                calendarRangeStartClassName={calendarRangeStartClassName}
                calendarRangeEndClassName={calendarRangeEndClassName}
                calendarRangeBetweenClassName={calendarRangeBetweenClassName}
                locale={locale}
                shouldHighlightWeekends={shouldHighlightWeekends}
                customDaysClassName={customDaysClassName}
                isQuickSelectorOpen={isYearSelectorOpen || isMonthSelectorOpen}
            />
        </div>
    );

};

export default CalendarMonth;