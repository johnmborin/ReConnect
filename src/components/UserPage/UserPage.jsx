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
  const question = useSelector((store) => store.question);
  const response = useSelector((store) => store.response);

  useEffect(() => {
    dispatch({ type: "FETCH_FAMILY" });
    dispatch({ type: "FETCH_EVENT" });
    dispatch({ type: "FETCH_RESOURCE" });
    dispatch({ type: "FETCH_QUESTION" });
    dispatch({ type: "FETCH_RESPONSE" });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Family: {JSON.stringify(family)}</p>
      <p>Event: {JSON.stringify(event)}</p>
      <p>Resource: {JSON.stringify(resource)}</p>
      <p>Question: {JSON.stringify(question)}</p>
      <p>Response: {JSON.stringify(response)}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
