import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

// Material UI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";

// Custom Day component with Badge
function CustomDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Check if the day is selected (has an event)
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    // Badge for selected days
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      {/* PickersDay component with Badge */}
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

// Main component for the StaticDatePicker with Events
export default function StaticDatePickerWithEvents() {
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Fetch events from the Redux store on component mount
  React.useEffect(() => {
    dispatch({ type: "FETCH_EVENT" });
  }, [dispatch]);

  // Get events from the Redux store
  const events = useSelector((store) => store.event);

  // State for the currently selected date and its events
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [selectedEvents, setSelectedEvents] = React.useState([]);

  // Handle date change event
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    // Filter events for the selected date
    const eventsForDate = events.filter((event) =>
      dayjs(event.date).isSame(dayjs(newValue), "day")
    );

    // Update selected events
    setSelectedEvents(eventsForDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* StaticDatePicker with custom day rendering */}
      <StaticDatePicker
        orientation="portrait"
        value={selectedDate}
        onChange={handleDateChange}
        slots={{
          day: CustomDay,
        }}
        slotProps={{
          // Pass highlighted days to CustomDay for badge rendering
          day: {
            highlightedDays: events.map((event) => dayjs(event.date).date()),
          },
        }}
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
