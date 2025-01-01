import React, { ReactNode } from "react";

import './style.scss';



export type CarousalProps = {
    content: ReactNode[]
};


export default ({ content }: CarousalProps) => {

    const nestTag = (idx: number) : ReactNode => {
        if (idx < content.length) {
            return <>
                <div className={`carousal-shuffle__item align-self-stretch d-flex`}>

                    {/* {nestTag(idx + 1)}   */}


                    <div className={`carousal-shuffle__item-content card bg-dark col-12 border-light pointer-cursor`} tabIndex={0}>
                            <div className={`card-body card-featured__body`} style={{color: 'white', width: '500px', height: '200px'}}>

                                <h5 className="card-title user-select-all">title</h5>
                                <p className={`card-subtitle user-select-all mb-2 text-muted`}>
                                            subtitle
                                </p>
                                <p className={`card-text text-muted`} > text </p>
                            </div>
                        </div>

                        {nestTag(idx + 1)}


                </div>
            </>
        } else {return <></>}
    };

    const nestReversedTag = (idx: number) : ReactNode => {
        if (idx < content.length) {
            return <>
                <div className={`carousal-shuffle__item align-self-stretch d-flex`}>

                    {/* {nestTag(idx + 1)}   */}
                    {nestReversedTag(idx + 1)}



                    <div className={`carousal-shuffle__item-content card bg-dark col-12 border-light pointer-cursor`} tabIndex={0}>
                            <div className={`card-body card-featured__body`} style={{color: 'white', width: '500px', height: '200px'}}>

                                <h5 className="card-title user-select-all">title</h5>
                                <p className={`card-subtitle user-select-all mb-2 text-muted`}>
                                            subtitle
                                </p>
                                <p className={`card-text text-muted`} > text </p>
                            </div>
                        </div>



                </div>
            </>
        } else {return <></>}
    };
    
    return (
    <div className={`carousal-shuffle position-relative`}>
        
        {/* {nestReversedTag(0)} */}
        {nestTag(0)}

        {/* { content.map( (_el, idx) => (
            
            <div key={idx} className={`carousal-shuffle__item align-self-stretch d-flex`}>

                <div className={`card bg-dark col-12 border-light pointer-cursor`} tabIndex={0}>

                    <div className={`card-body card-featured__body`}>

                        <h5 className="card-title user-select-all">title</h5>
                        <p className={`card-subtitle user-select-all mb-2 text-muted`}>
                                    subtitle
                        </p>
                        <p className={`card-text text-muted`} > text </p>

                    </div>
                    
                </div>

            </div>
        ))} */}
    </div>);
}