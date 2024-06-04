import React from 'react';
import { Col } from 'react-bootstrap';
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
            {
                resources.map(resource => (
                    <div>
                        <Col sm={6} md={4}>
                            <div className="proj-imgbx">
                                <img src='#' />
                                <div className="proj-txtx">
                                    <h4>{resource.description}</h4>
                                    <span>{resource.url}</span>
                                </div>
                            </div>
                        </Col>
                        <a className='link' href={resource.url} target="_blank">{resource.description}</a>
                        <hr className='line-under-resources'></hr>
                    </div>
                ))
            }
        </div>
    );
}

export default ResourcesView;