import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AdminQuestions.css";

function AdminQuestions() {
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const optionIdCounter = useRef(0);

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION" });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    detail: "",
    hidden: false,
    type: "",
    options: [],
    updatedOptions: [],
  });

  const [options, setOptions] = useState([]);
  const [updatedOptions, setUpdatedOptions] = useState(
    currentQuestion.updatedOptions || []
  );

  function handleOptionChange(id, event) {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, detail: event.target.value } : option
    );
    setOptions(newOptions);

    const newUpdatedOptions = updatedOptions.map((option) =>
      option.id === id ? { ...option, detail: event.target.value } : option
    );
    setUpdatedOptions(newUpdatedOptions);
  }

  function handleOptionDelete(id) {
    if (String(id).startsWith("new-")) {
      const newOptions = options.filter((option) => option.id !== id);
      setOptions(newOptions);
    } else {
      const newUpdatedOptions = updatedOptions.filter(
        (option) => option.id !== id
      );
      setUpdatedOptions(newUpdatedOptions);
    }
  }

  function openModal(question) {
    setCurrentQuestion(
      question || { id: null, detail: "", hidden: false, type: "" }
    );
    setOptions(question ? question.options : []);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleVisibility(id) {
    dispatch({ type: "UPDATE_QUESTION_VISIBILITY", payload: { id: id } });
  }

  function handleSave(e) {
    e.preventDefault();
    if (currentQuestion.id) {
      dispatch({
        type: "UPDATE_QUESTION",
        payload: { ...currentQuestion, options, updatedOptions },
      });
    } else {
      dispatch({
        type: "POST_QUESTION",
        payload: { ...currentQuestion, options },
      });
    }
    closeModal();
  }

  return (
    <div className="container">
      <p>Admin Questions</p>
      <ul>
        {question.map((question) => (
          <li key={question.id}>
            {question.detail} - {question.hidden ? "hidden" : "visible"}
            <button onClick={() => openModal(question)}>Edit question</button>
            <button
              onClick={() => {
                toggleVisibility(question.id);
              }}
            >
              Toggle visibility
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => openModal()}>Add question</button>

      {isModalOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSave}>
              <label>
                Question Text:
                <input
                  type="text"
                  value={currentQuestion.detail}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      detail: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Hidden?:
                <input
                  type="checkbox"
                  checked={currentQuestion.hidden}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      hidden: e.target.checked,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Question Type:
                <select
                  value={currentQuestion.type}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="short">Short Response</option>
                  <option value="single">Multiple Choice</option>
                </select>
              </label>

              {(currentQuestion.type === "single" ||
                currentQuestion.type === "multi") && (
                <>
                  <label>
                    Single Answer
                    <input
                      type="radio"
                      name="type"
                      value="single"
                      defaultChecked
                      checked={currentQuestion.type === "single"}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          type: "single",
                        })
                      }
                    />
                  </label>
                  <label>
                    Multiple Answer
                    <input
                      type="radio"
                      name="type"
                      value="multi"
                      checked={currentQuestion.type === "multi"}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          type: "multi",
                        })
                      }
                    />
                  </label>
                </>
              )}
              <br />
              {(currentQuestion.type === "single" ||
                currentQuestion.type === "multi") &&
                options.map((option) => (
                  <div key={option.id}>
                    <input
                      type="text"
                      value={option.detail}
                      onChange={(event) => handleOptionChange(option.id, event)}
                    />
                    <button
                      type="button"
                      onClick={() => handleOptionDelete(option.id)}
                    >
                      Delete Option
                    </button>
                    <br />
                  </div>
                ))}
              <br />
              {(currentQuestion.type === "single" ||
                currentQuestion.type === "multi") && (
                <button
                  type="button"
                  onClick={() =>
                    setOptions([
                      ...options,
                      { id: `new-${optionIdCounter.current++}`, value: "" },
                    ])
                  }
                >
                  Add Option
                </button>
              )}
              <br />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQuestions;
