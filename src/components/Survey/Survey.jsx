import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';



function Survey(){


    const dispatch = useDispatch();
    const surveyList = useSelector((store) => store.survey.surveyList);
    const [replyBody, setReplyBody] = useState ('');
    const [heading, setHeading] = useState('Functional Component');
    const [userId, setUserId] = useState (0);

    useEffect(() => {
        getSurveyList();
    }, []);


    const getSurveyList = () => {
        dispatch({ type: 'FETCH_SURVEY' })
    };

    const addSurveyReply = (event) => {
      if (event) {
        event.preventDefault();
      }
      dispatch({ type: 'ADD_REPLY', payload: { response: replyBody } });
    };
  
  


  
    return (
      <div>
        <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Welcome to the Survey</h2>
      <div>
        {surveyList.map(survey => (
          <div className='entry' key={survey.id} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
              <h3>{survey.question_body}</h3>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <h2 className='title'style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Response</h2>
      <form className='form' onSubmit={(e) => addSurveyReply(e)} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        <input type="text" placeholder="*" value={replyBody} onChange={e => setReplyBody(e.target.value)} />
        <br />
        <h6>* is required field</h6>
        <button>Submit</button>
      </form>
      </div>
    );
}
  
export default Survey;