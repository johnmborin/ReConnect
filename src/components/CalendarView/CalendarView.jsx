import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import dayjs from 'dayjs';

// material UI
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function StaticDatePickerWithEvents() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'FETCH_EVENT' });
  }, [dispatch]);

  const events = useSelector((store) => store.event);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedEvents, setSelectedEvents] = React.useState([]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    // Filter events for the selected date
    const eventsForDate = events.filter(
      (event) => dayjs(event.date).isSame(dayjs(newValue), 'day')
    );

    setSelectedEvents(eventsForDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        value={selectedDate}
        onChange={handleDateChange}
      />
      {/* Display events for the selected date */}
      {selectedEvents.map((event, index) => (
        <div key={index}>
          {event.detail} ({event.time})
        </div>
      ))}
    </LocalizationProvider>
  );
}
