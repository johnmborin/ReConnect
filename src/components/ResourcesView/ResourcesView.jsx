import React from 'react';
import { useState } from 'react';
import './ResourcesView.css'

function ResourcesView() {
    const [isChild, setIsChild] = useState(false);

    return (
        <div className='rescources-container'>
            <h2>RESOURCES</h2>
            <hr className='line-under-resources'></hr>

            {isChild ? (
                // CHILD LINKS
                <div>
                    <div>
                        {/* <p>text</p> */}
                        <a className='link' href="https://kids.kiddle.co/Divorce">
                            Divorce Facts For Kids
                        </a>
                        <hr className='line-under-resources'></hr>
                    </div>
                    <div>
                        {/* <p>text</p> */}
                        <a className='link' href="https://themarriagefoundation.org/effects-of-divorce-on-children/?gclid=CjwKCAiAmZGrBhAnEiwAo9qHifncaYm7sHzJiw8RR-JnEcioNxx7gO70nvG725g3pDXNv1nPMgDrDxoCQI0QAvD_BwE">
                            Effects of Divorce on Children
                        </a>
                        <hr className='line-under-resources'></hr>
                    </div>
                    <div>
                        {/* <p>text</p> */}
                        <a className='link' href="https://themarriagefoundation.org/effects-of-divorce-on-children/?gclid=CjwKCAiAmZGrBhAnEiwAo9qHifncaYm7sHzJiw8RR-JnEcioNxx7gO70nvG725g3pDXNv1nPMgDrDxoCQI0QAvD_BwE">
                            Effects of Divorce on Children
                        </a>
                        <hr className='line-under-resources'></hr>
                    </div>
                </div>
            ) : (
                 // PARENT LINKS
                 <div>
                 <div>
                     {/* <p>text</p> */}
                     <a className='link' href="https://themarriagefoundation.org/effects-of-divorce-on-children/?gclid=CjwKCAiAmZGrBhAnEiwAo9qHifncaYm7sHzJiw8RR-JnEcioNxx7gO70nvG725g3pDXNv1nPMgDrDxoCQI0QAvD_BwE">
                         Effects of Divorce on Children
                     </a>
                     <hr className='line-under-resources'></hr>
                 </div>
                 <div>
                     {/* <p>text</p> */}
                     <a className='link' href="https://afterdivorce.goodsamaritananglican.org/?page=healingafterdivorce">
                         How to Heal From Divorce
                     </a>
                     <hr className='line-under-resources'></hr>
                 </div>
                 <div>
                     {/* <p>text</p> */}
                     <a className='link' href="https://themarriagefoundation.org/effects-of-divorce-on-children/?gclid=CjwKCAiAmZGrBhAnEiwAo9qHifncaYm7sHzJiw8RR-JnEcioNxx7gO70nvG725g3pDXNv1nPMgDrDxoCQI0QAvD_BwE">
                         Supporting Kids During Divorce
                     </a>
                     <hr className='line-under-resources'></hr>
                 </div>
             </div>
            )}
        </div>
    );
}

export default ResourcesView;