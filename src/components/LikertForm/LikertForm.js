import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import './LikertForm.css';

const likertOptionStyle = {
    padding: '5px',
    cursor: 'pointer',
    margin: '0 5px',
};

function LikertForm() {

    const dispatch = useDispatch();
    const likertList = useSelector((store) => store.likertReducer.likertList);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [replyBody, setReplyBody] = useState('');
    const [userId, setUserId] = useState(0);
    const [score, setScore] = useState(0);
    const currentDate = dayjs();
    const likertFormRef = useRef(null);

    useEffect(() => {
        getLikertList();
    }, []);

    const getLikertList = () => {
        dispatch({ type: 'FETCH_LIKERT' });
    };

    const addLikertReply = (event) => {
        event.preventDefault();

        if (selectedQuestion) {
            dispatch({
                type: 'FETCH_REPLY_LIKERT',
                payload: {
                    response: replyBody,
                    question_id: selectedQuestion.id,
                    score: score,
                    user_id: userId,
                    date: currentDate,
                },
            });
        } else {
            alert('Please select a question before submitting.');
        }
    };

    const handleLikertClick = (selectedScore) => {
        setScore(selectedScore);
        if (likertFormRef.current) {
            likertFormRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    };

    return (
        <div>
            <h2
                className='title'
                style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
            >
                Response 1-5
            </h2>
            <div>
                {likertList.map((likert) => (
                    <div
                        className='entry'
                        key={likert.id}
                        onClick={() => setSelectedQuestion(likert)}
                        style={{
                            padding: '10px',
                            margin: '10px',
                            borderRadius: '10px',
                            border: `2px solid ${selectedQuestion === likert ? 'blue' : 'gray'}`,
                        }}>
                        <h3>{likert.id}. {likert.detail}</h3>
                        <form
                            ref={likertFormRef}
                            className='likert form'
                            onSubmit={(e) => addLikertReply(e)}
                        // style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
                        >
                            <div style={{ display: 'flex' }}>
                                <span onClick={() => handleLikertClick(1)} style={likertOptionStyle}>
                                    1 Strongly Disagree
                                </span>
                                <span onClick={() => handleLikertClick(2)} style={likertOptionStyle}>
                                    2 Disagree
                                </span>
                                <span onClick={() => handleLikertClick(3)} style={likertOptionStyle}>
                                    3 Neutral
                                </span>
                                <span onClick={() => handleLikertClick(4)} style={likertOptionStyle}>
                                    4 Agree
                                </span>
                                <span onClick={() => handleLikertClick(5)} style={likertOptionStyle}>
                                    5 Strongly Agree
                                </span>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                ))}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default LikertForm;
