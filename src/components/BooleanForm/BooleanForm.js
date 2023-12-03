import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

function BooleanForm() {

    const dispatch = useDispatch();
    const surveyList = useSelector((store) => store.survey.surveyList);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [replyBody, setReplyBody] = useState('');
    const [userId, setUserId] = useState(0);
    const [score, setScore] = useState(0);
    const currentDate = dayjs();

    useEffect(() => {
        getSurveyList();
    }, []);

    const getSurveyList = () => {
        dispatch({ type: 'FETCH_SURVEY' });
    };

    const addSurveyReply = (event) => {
        event.preventDefault();

        if (selectedQuestion) {
            dispatch({
                type: 'FETCH_REPLY',
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

    const handleBooleanClick = (selectedBoolean) => {
    };

    return (
        <div>
            <div>
                {surveyList.map((survey) => (
                    <div
                        className='entry'
                        key={survey.id}
                        onClick={() => setSelectedQuestion(survey)}
                        style={{
                            padding: '10px',
                            margin: '10px',
                            borderRadius: '10px',
                            border: `2px solid ${selectedQuestion === survey ? 'blue' : 'gray'}`,
                        }}>
                        <h3>{survey.id}. {survey.detail}</h3>
                    </div>

                ))}
                <br></br>
                <br></br>
                <h2
                    className='title'
                    style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
                >
                    Response Yes or No
                </h2>
                <div>
                    <button onClick={() => handleBooleanClick(true)}>True</button>
                    <button onClick={() => handleBooleanClick(false)}>False</button>
                </div>
            </div>
        </div>
    )
}

export default BooleanForm;
