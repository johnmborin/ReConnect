import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import "./CalendarView.css";

// Material UI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import CheckIcon from "@mui/icons-material/Check";

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
      badgeContent={isSelected ? <CheckIcon /> : undefined}
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

    // Filter events for the selected day, month, and year
    const eventsForDay = events.filter((event) =>
      dayjs(event.date).isSame(dayjs(newValue), "day")
    );

    // Update selected events
    setSelectedEvents(eventsForDay);
  };

  // Fetch and update events when the component mounts
  React.useEffect(() => {
    handleDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* StaticDatePicker with custom day rendering */}

      <h2>All Events</h2>
      {events.map((event, index) => (
        <div key={index}>
          {event.date} - {event.detail} ({event.time})
        </div>
      ))}

      <h2>Selected Date</h2>
      <div>{selectedDate.format("MM/DD/YYYY")}</div>

      <h2>Add Event</h2>
      <input type="text" id="detail" />
      <input type="time" id="time" />
      <button
        onClick={() =>
          dispatch({
            type: "POST_EVENT",
            payload: {
              date: selectedDate.format("MM/DD/YYYY"),
              detail: document.getElementById("detail").value,
              time: document.getElementById("time").value,
            },
          })
        }
      >
        Add Event
      </button>

      <StaticDatePicker
        orientation="portrait"
        value={selectedDate}
        onChange={handleDateChange}
        onMonthChange={handleDateChange}
        slots={{
          day: CustomDay,
        }}
        slotProps={{
          // Pass highlighted days to CustomDay for badge rendering
          day: {
            highlightedDays: events
              .filter(
                (event) =>
                  dayjs(event.date).isSame(dayjs(selectedDate), "month") &&
                  dayjs(event.date).isSame(dayjs(selectedDate), "year")
              )
              .map((event) => dayjs(event.date).date()),
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
