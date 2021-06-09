# norama-react-modern-calendar-datepicker

A modified version of [Kiarash-Z/react-modern-calendar-datepicker](https://github.com/Kiarash-Z/react-modern-calendar-datepicker), forked from [HassanMojab/react-modern-calendar-datepicker](https://github.com/hassanmojab/react-modern-calendar-datepicker) because that version solves a [calendarElement null check bug](https://github.com/Kiarash-Z/react-modern-calendar-datepicker/issues/204).

This fork implements the feature of showing more consecutive months in a row.

New properties added to `DatePicker` and `Calendar`:

- `numberOfMonths`: number of consecutive months to be shown (default: 1)
- `computeActiveDateRef`(optional): reference object - its `current` will be set to a function
                          which recomputes the active date shown based on the value passed
                          or based on the calendar value set if called without parameter 

For further information refer to the [original documentation](https://kiarash-z.github.io/react-modern-calendar-datepicker/).

## Installation 🚀
```bash
npm i norama-react-modern-calendar-datepicker

# or if you prefer Yarn:
yarn add norama-react-modern-calendar-datepicker
```

## LICENSE

[MIT](LICENSE)
