import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AdminQuestions.css";

function AdminQuestions() {
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    detail: "",
    hidden: false,
    type: "",
  });

  const [options, setOptions] = useState(currentQuestion.options || ["", ""]);

  function handleOptionChange(index, event) {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  }

  function openModal(question) {
    setCurrentQuestion(
      question || { id: null, detail: "", hidden: false, type: "" }
    );
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
      dispatch({ type: "UPDATE_QUESTION", payload: currentQuestion });
    } else {
      dispatch({ type: "POST_QUESTION", payload: currentQuestion });
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
            <button onClick={() => openModal(prompt)}>Edit prompt</button>
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
                  <option value="multiple">Multiple Choice</option>
                </select>
              </label>

              {currentQuestion.type === "multiple" && (
                <>
                  <label>
                    Single Answer
                    <input
                      type="radio"
                      name="choiceType"
                      value="single"
                      checked={currentQuestion.choiceType === "single"}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          choiceType: "single",
                        })
                      }
                    />
                  </label>
                  <label>
                    Multiple Answer
                    <input
                      type="radio"
                      name="choiceType"
                      value="multi"
                      checked={currentQuestion.choiceType === "multi"}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          choiceType: "multi",
                        })
                      }
                    />
                  </label>
                </>
              )}
              <br />
              {currentQuestion.type === "multiple" &&
                options.map((option, index) => (
                  <div key={index}>
                    <label>
                      Option {index + 1}:
                      <input
                        type="text"
                        value={option}
                        onChange={(event) => handleOptionChange(index, event)}
                      />
                    </label>
                    <br />
                  </div>
                ))}
              <br />
              <button
                type="button"
                onClick={() => setOptions([...options, ""])}
              >
                Add Option
              </button>
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
