import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./CalendarView.css";

const CalendarView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_EVENT" });
    }, []); 

    const userEvents = useSelector((store) => store.event);
    
    return (
        <div>
            CalendarView
            {JSON.stringify(userEvents)}
        </div>
    );
}

export default CalendarView;
