import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const family = useSelector((store) => store.family);
  const event = useSelector((store) => store.event);
  const resource = useSelector((store) => store.resource);

  useEffect(() => {
    dispatch({ type: "FETCH_FAMILY" });
    dispatch({ type: "FETCH_EVENT" });
    dispatch({ type: "FETCH_RESOURCE" });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Family: {JSON.stringify(family)}</p>
      <p>Event: {JSON.stringify(event)}</p>
      <p>Resource: {JSON.stringify(resource)}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
