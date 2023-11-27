import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';



function Survey(){


    const dispatch = useDispatch();
    const surveyList = useSelector((store) => store.survey.surveyList);
    const [heading, setHeading] = useState('Functional Component');
    const [userId, setUserId] = useState (0);

    useEffect(() => {
        getSurveyList();
    }, []);


    const getSurveyList = () => {
        dispatch({ type: 'FETCH_SURVEY' })
    };


  
    return (
      <div>
        <h2>{heading}</h2>
      </div>
    );
}
  
export default Survey;