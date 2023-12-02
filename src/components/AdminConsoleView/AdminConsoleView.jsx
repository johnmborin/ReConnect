import React from "react";
import { useHistory } from "react-router-dom";

function AdminConsoleView() {
  const history = useHistory();

  return (
    <div className="container">
      <p>AdminConsoleView Page</p>
      <button
        // useHistory to push to admin search view
        onClick={() => history.push("/admin/search")}
      >
        View User Data
      </button>
      {/* <ul>Survey Responses</ul>
      <ul>Journals</ul> */}
      <button onClick={() => history.push("/admin/resources")}>
        Edit Resources
      </button>
      <button onClick={() => history.push("/admin/prompts")}>
        Edit Prompts (Journal)
      </button>
      <button onClick={() => history.push("/admin/questions")}>
        Edit Questions (Survey)
      </button>
    </div>
  );
}

export default AdminConsoleView;
