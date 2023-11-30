import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ResourcesView.css'

function ResourcesView() {
    const dispatch = useDispatch();
    const resources = useSelector((store) => store.resource);

    useEffect(() => {
        dispatch({ type: 'FETCH_RESOURCE' })
    }, []);

    return (
        <div className='rescources-container'>
            <h2>RESOURCES</h2>
            <hr className='line-under-resources'></hr>
            {
                resources.map(resource => (
                    <div>
                        <a className='link' href={resource.url} target="_blank">{resource.description}</a>
                        <hr className='line-under-resources'></hr>
                    </div>
                ))
            }
        </div>
    );
}

export default ResourcesView;