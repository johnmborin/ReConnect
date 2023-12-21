import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState, useEffect } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

import "./CalendarView.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function CustomDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckIcon /> : undefined}>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CalanderView() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const events = useSelector(store => store.event);
  const families = useSelector(store => store.family);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editableEvent, setEditableEvent] = useState({
    detail: "",
    date: "",
    time: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT" });
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      handleDateChange(selectedDate);
      setSortedEvents(
        [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  }, [selectedDate, events, families]);

  const handleDateChange = newValue => {
    setSelectedDate(newValue);
    const eventsForDay = events.filter(event =>
      dayjs(event.date).isSame(newValue, "day")
    );
    setSelectedEvents(eventsForDay);
  };

  const formatDate = dateString => {
    return dayjs(dateString).format("MM/DD/YYYY");
  };

  const handleEdit = event => {
    setEditEventId(event.id);
    setEditableEvent({
      detail: event.detail,
      date: event.date,
      time: event.time,
    });
    document.getElementById("detail").value = event.detail;
    document.getElementById("time").value = dayjs(event.time).format("HH:mm");
    setIsEditing(true);
  };

  const handleCancel = () => {
    document.getElementById("detail").value = "";
    document.getElementById("time").value = "";
    setIsEditing(false);
  };

  const handleDelete = eventId => {
    dispatch({ type: "DELETE_EVENT", payload: eventId });

    const updatedEvents = events.filter(event => event.id !== eventId);
    setSortedEvents(updatedEvents);

    const updatedSelectedEvents = selectedEvents.filter(
      event => event.id !== eventId
    );
    setSelectedEvents(updatedSelectedEvents);
  };

  const saveEdit = () => {
    dispatch({
      type: "EDIT_EVENT",
      payload: { eventId: editEventId, eventData: editableEvent },
    });
    setEditEventId(null);
    setIsEditing(false);
    document.getElementById("detail").value = "";
    document.getElementById("time").value = "";
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditableEvent(prev => ({ ...prev, [name]: value }));
  };

  const formatTime = timeString => {
    return dayjs(timeString).format("h:mm A");
  };

  const renderEvent = event => {
    return (
      <div className="event-display">
        <span className="event-details">
          {event.detail} - {formatTime(event.time)}
        </span>
        <div className="edit-delete-btn">
          <EditIcon
            onClick={() => handleEdit(event)}
            sx={{ color: "black" }}
          />
          <DeleteIcon
            onClick={() => handleDelete(event.id)}
            sx={{ color: "black" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleDateChange}
          ToolbarComponent={() => null}
          slots={{ day: CustomDay }}
          slotProps={{
            day: {
              highlightedDays: events
                .filter(
                  event =>
                    dayjs(event.date).isSame(dayjs(selectedDate), "month") &&
                    dayjs(event.date).isSame(dayjs(selectedDate), "year")
                )
                .map(event => dayjs(event.date).date()),
            },
          }}
        />

        <Button
          fullWidth
          sx={{
            backgroundColor: "#1399a3",
            color: "white",
            textAlign: "center",
            marginBottom: "10px",
            borderRadius: "15px",
          }}
          variant="contained"
          onClick={handleClickOpen}>
          View All Events
        </Button>

        <div className="add-event">
          <TextField
            fullWidth
            type="text"
            id="detail"
            name="detail"
            label="Event Details"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
          <div>
            <TextField
              type="time"
              id="time"
              name="time"
              sx={{ paddingTop: "10px" }}
              variant="outlined"
              onChange={handleInputChange}
            />
            {isEditing ? (
              <>
                <Button
                  sx={{
                    height: "55px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#1399a3",
                    color: "white",
                  }}
                  variant="contained"
                  onClick={saveEdit}>
                  EDIT
                </Button>
                <Button
                  sx={{
                    height: "55px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#1399a3",
                    color: "white",
                  }}
                  variant="contained"
                  onClick={handleCancel}>
                  CANCEL
                </Button>
              </>
            ) : (
              <Button
                sx={{
                  height: "55px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#1399a3",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  dispatch({
                    type: "POST_EVENT",
                    payload: {
                      date: selectedDate.format("MM/DD/YYYY"),
                      detail: document.getElementById("detail").value,
                      time: document.getElementById("time").value,
                    },
                  });

                  document.getElementById("detail").value = "";
                  document.getElementById("time").value = "";
                }}>
                ADD
              </Button>
            )}
          </div>
        </div>

        <p className="events-for-title">
          Events for {formatDate(selectedDate)}:
        </p>
        {selectedEvents.length === 0 ? (
          <p className="events-display">No events</p>
        ) : (
          selectedEvents.map(event => (
            <div key={event.id}>{renderEvent(event)}</div>
          ))
        )}

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            id="customized-dialog-title">
            All Events
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {sortedEvents.map((event, index) => (
              <div
                className="events-display"
                key={index}>
                {event.detail}
                <div>
                  {formatDate(event.date)} @{" "}
                  {dayjs(event.time).format("h:mm A")}
                </div>
              </div>
            ))}
          </DialogContent>
        </BootstrapDialog>
      </LocalizationProvider>
    </div>
  );
}

export default CalanderView;
