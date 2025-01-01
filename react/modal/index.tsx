import React, { ReactNode, useEffect, useState } from 'react';

import './style.scss';

export type ModalProp = {
    content?: string | ReactNode;
    show?: boolean;
    onClose?: Function;
};


export default ( {content, show, onClose }: ModalProp) => {

    const [visible, setVisible] = useState<boolean>(show);
    // const setVisible = (flag: boolean) => {
    //     console.log('setVisible', flag);
    //     if (!!onClose && !flag) {
    //         onClose(flag);
    //     }
    //     // _setVisible(flag);
    // };

    useEffect(()=> (setVisible(show)), [show]);

    return (
    <div className={`modal-page ${visible? '':'d-none'}`}>

        <div className={`modal-page__background animate__animated animate__faster ${visible? 'animate__fadeIn':'d-none'}`}
            onClick={() => (!!onClose && onClose(false))}></div>

        <div className='modal-page__modal'>
            
            <div className={`modal-page__modal-content`}
                onClick={(e) => (e.preventDefault())}>
                
                <div className={`row justify-content-center px-0 animate__animated animate__fast ${visible? 'animate__fadeInUp':'animate__fadeOutUp'}`}>

                    {content}
                    
                </div>
            

            </div>

        </div>

    </div>);
};