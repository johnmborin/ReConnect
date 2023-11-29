import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material UI
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarValue() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_EVENT" });
  }, [dispatch]);

  const events = useSelector((store) => store.event);

  const [value, setValue] = React.useState(dayjs());

  // checks to see if any events today
  const renderDay = (date, _value, DayComponentProps) => {
    const event = events.find(
        (event) => dayjs(event.date).isSame(dayjs(date), 'day')
    );

    return (
        <div>
            {DayComponentProps.day}
            {event && (
                <div style={{ fontSize: '0.8em' }}>
                    {event.detail} ({event.time})
                </div>
            )}
        </div>
    );
};


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem label="Controlled calendar with events">
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderDay={renderDay}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
