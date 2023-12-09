import React from "react";
import { useHistory } from "react-router-dom";
import './AdminConsoleView.css'
function AdminConsoleView() {
  const history = useHistory();

  return (
    <div className="container">
      <div className="admin-view-background">
      <h2 className="admin-title">Admin View</h2>
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
    </div>
  );
}

export default AdminConsoleView;
