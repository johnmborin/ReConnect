import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminSearchView() {
  const dispatch = useDispatch();
  const journal = useSelector((state) => state.journal);
  const survey = useSelector((state) => state.survey.surveyList);
  const [showJournal, setShowJournal] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isSurveyDialogOpen, setIsSurveyDialogOpen] = useState(false);
  const [surveyDialogContent, setSurveyDialogContent] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_JOURNAL" });
    dispatch({ type: "FETCH_SURVEY" });
  }, []);

  const handleViewJournal = () => {
    setShowJournal(!showJournal);
    if (showSurvey) {
      setShowSurvey(false);
    }
  };

  const handleViewSurvey = () => {
    setShowSurvey(!showSurvey);
    if (showJournal) {
      setShowJournal(false);
    }
  };

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const handleOpenSurveyDialog = (content) => {
    setSurveyDialogContent(content);
    setIsSurveyDialogOpen(true);
  };

  return (
    <div className="container">
      <p>Admin Search View</p>
      <button onClick={handleViewJournal}>View Journals</button>
      <button onClick={handleViewSurvey}>View Surveys</button>
      {showJournal && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {journal.map((item) => (
              <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleOpenDialog(item.detail)}>
                    View Journal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showSurvey && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {survey.map((item) => (
              <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleOpenSurveyDialog(item.detail)}>
                    View Survey
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <dialog open={isDialogOpen}>
        <p>{dialogContent}</p>
        <button onClick={() => setIsDialogOpen(false)}>Close</button>
      </dialog>
      <dialog open={isSurveyDialogOpen}>
        <p>{surveyDialogContent}</p>
        <button onClick={() => setIsSurveyDialogOpen(false)}>Close</button>
      </dialog>
    </div>
  );
}

export default AdminSearchView;
