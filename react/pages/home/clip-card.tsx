import React from 'react';

/*
export type ClipProp = {
    title: string;
    duration: number;
    video: object; //file|cam
    h5template: object; // json//todo model
}
// */

export default () => (
    <div className='clip-card card bg-dark col-xs-12 my-5 pointer-cursor' tabIndex={0}>

        <div className='clip-header'>
            <div className='clip-connector'></div>
            <div className='clip-circle'>
                <span className="material-icons align-middle">movie</span>
            </div>
        </div>

        <div className='card-header col-12 animate__animated animate__fadeInUp'>
            <div className='offset-sm-8 col-sm-4 col-12'>Hello</div>
        </div>
        <div className='card-body'>
            <h5 className="card-title">Clip</h5>

            <div className='clip-resource row'>
                <div className='col-xs-3 col-sm-2 mx-1 px-0'>
                    <span className="material-icons align-middle">mic</span>
                </div>
                <p>Resource</p>

            </div>

            <div className='clip-resource row'>
                <div className='col-xs-3 col-sm-2 mx-1 px-0'>
                    <span className="material-icons align-middle">videocam</span>
                </div>
                <p>Resource</p>
            </div>

            <div className='clip-resource row'>
                <div className='col-xs-3 col-sm-2 mx-1 px-0'>
                    <span className="material-icons align-middle">layers</span>
                </div>
                <p>Resource</p>

            </div>

            <div className='preview-canvas'></div>




        </div>
        
    </div>
)