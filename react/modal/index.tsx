import React, { ReactNode, useEffect, useState } from 'react';

import './style.scss';

export type ModalProp = {
    content?: string | ReactNode;
    show?: boolean;
    onClose?: Function;
};


export default ( {content, show, onClose }: ModalProp) => {

    const [visible, _setVisible] = useState<boolean>(show);
    const setVisible = (flag: boolean) => {
        if(!!onClose && !!!flag) {
            onClose();
        }
        _setVisible(flag);
    };
    useEffect(()=> (setVisible(show)), [show]);

    return (
    <div className={`modal-page ${!!visible? '':'d-none'}`}>

        <div className='modal-page__background animate__animated animate__fadeIn'></div>

        <div className='modal-page__modal'>
            
            <div className='modal-page__modal-content'>
                
                <button type="button"
                    onClick={() => (setVisible(false))}
                    className="close-btn btn border-0 btn-outline-light btn-sm" tabIndex={0}>
                    <span className="material-symbols-outlined align-middle py-3 m-1">close</span>
                </button>

                <div
                    className='row justify-content-center px-0 animate__animated animate__fadeInUp animate__delay-1s'>

                    {content}
                    
                </div>

                
            

            </div>

        </div>

    </div>);
};