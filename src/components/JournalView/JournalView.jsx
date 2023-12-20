import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import axios from "axios";
import "./JournalView.css";
import { useSelector, useDispatch } from "react-redux";

const JournalView = () => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState("");
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [editingEntryId, setEditingEntryId] = useState(null);
  const user = useSelector(store => store.user);
  const prompts = useSelector(store => store.prompt);

  useEffect(() => {
    fetchEntries();
    dispatch({ type: "FETCH_PROMPT" });
  }, []);

  const fetchEntries = () => {
    axios
      .get("/api/journal")
      .then(response => {
        const formattedEntries = response.data.map(entry => ({
          ...entry,
          date: new Date(entry.date).toLocaleDateString(),
        }));
        setEntries(formattedEntries);
      })
      .catch(error => console.error("Error fetching journal entries:", error));
  };
  const handleSelectChange = event => {
    setSelectedPromptId(event.target.value);
  };

  const saveEntry = () => {
    const entryData = {
      prompt_id: selectedPromptId,
      user_id: user.id,
      date: entryDate,
      detail: currentEntry,
    };

    const method = editingEntryId ? "put" : "post";
    const url = `/api/journal${editingEntryId ? `/${editingEntryId}` : ""}`;

    axios[method](url, entryData)
      .then(() => {
        fetchEntries();
        resetForm();
      })
      .catch(error => console.error("Error saving journal entry:", error));
  };

  const editEntry = entry => {
    setEditingEntryId(entry.id);
    setSelectedPromptId(entry.prompt_id);
    setCurrentEntry(entry.detail);
    setEntryDate(entry.date);
  };

  const deleteEntry = id => {
    axios
      .delete(`/api/journal/${id}`)
      .then(() => fetchEntries())
      .catch(error => console.error("Error deleting journal entry:", error));
  };

  const resetForm = () => {
    setEditingEntryId(null);
    setSelectedPromptId("");
    setCurrentEntry("");
    setEntryDate(new Date().toISOString().split("T")[0]);
  };

  const promptMap = prompts.reduce((map, prompt) => {
    map[prompt.id] = prompt.detail;
    return map;
  }, {});

  return (
    <div className="journal-view-container">
      <h1 className="journal-title">JOURNAL</h1>
      <input
        type="date"
        value={entryDate}
        onChange={e => setEntryDate(e.target.value)}
      />
      <FormControl
        style={{ backgroundColor: "white", marginBottom: "15px" }}
        fullWidth>
        <InputLabel id="promptDropdownLabel">Choose a prompt:</InputLabel>
        <Select
          labelId="promptDropdownLabel"
          id="promptDropdown"
          value={selectedPromptId}
          onChange={handleSelectChange}
          style={{ maxWidth: "100%" }}>
          <MenuItem value="">Choose a prompt...</MenuItem>
          {prompts.map(prompt => (
            <MenuItem
              key={prompt.id}
              value={prompt.id}
              style={{
                whiteSpace: "normal",
                borderBottom: "1px solid #e0e0e0",
              }}>
              {prompt.detail}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <textarea
        placeholder="Write your journal entry here..."
        value={currentEntry}
        onChange={e => setCurrentEntry(e.target.value)}
      />
      <button onClick={saveEntry}>
        {editingEntryId ? "Update Entry" : "Save Entry"}
      </button>
      <div>
        {entries.map(entry => (
          <div
            key={entry.id}
            className="journal-entry">
            <strong>Date:</strong> {entry.date}
            <br />
            <strong>Prompt:</strong> {promptMap[entry.prompt_id]}
            <br />
            <strong>Entry:</strong> {entry.detail}
            <br />
            <button onClick={() => editEntry(entry)}>Edit</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalView;
