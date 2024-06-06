import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ResourcesView.css'
import Test from './test.jpeg';

function ResourcesView() {
    const dispatch = useDispatch();
    const resources = useSelector((store) => store.resource);

    useEffect(() => {
        dispatch({ type: 'FETCH_RESOURCE' })
    }, []);
    
    return (
        <div className='rescources-container'>
            <h2>RESOURCES</h2>
            {
                resources.map(resource => (
                
                    <div>
                        <Col sm={6} md={4} className="resource-item">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <div className="resource-imgbx">
                                    <img src={resource.imageurl} alt="Resource Image" />
                                    <div className="resource-txtx">
                                        <h4>{resource.description}</h4>
                                    </div>
                                </div>
                            </a>
                        </Col>
                        
                    </div>
                ))
            }
        </div>
    );
}

export default ResourcesView;