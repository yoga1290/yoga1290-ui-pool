import React, { useState } from "react";

export type ButtonProps = {
    click?: React.MouseEventHandler<HTMLButtonElement>|Function|any;
    icon?: string;
    text?: string;
};

export type ButtonListProps = {
    buttons: ButtonProps[]
};

const findFirst = (_o:any, i:number) => (i == 0);
const findOthers = (_o:any, i: number) => (i > 0);

export default ({ buttons }: ButtonListProps) => {


    const [spinners, setSpinners] = useState<any>({});
    const showSpinnerAt = (idx:number) => {
        spinners[idx] = true;
        setSpinners(Object.assign({}, spinners));
    };
    const hideSpinnerAt = (idx:number) => {
        spinners[idx] = false;
        setSpinners(Object.assign({}, spinners));
    };
    const isPromise = (v:any) => (typeof v === 'function');
    
    const showSpinnerIfPromise = (callback: any, idx: number) => {
        if (isPromise(callback)) {
            let call = callback();
            const hasPromise = typeof call.then === 'function';
            if (hasPromise) {
                showSpinnerAt(idx);
                const closeSpinner = () => (hideSpinnerAt(idx));
                return call.then(closeSpinner, closeSpinner);
            }
        } else {
            return callback();
        }
    };
    
return <div className='col-12 d-print-none'>
    
    
    {(buttons.length > 1) && (<>
        <div className="card-featured-upper__menu-container d-inline">
            <button type="button"
                tabIndex={0}
                className="btn border-0 btn-outline-light btn-sm card-featured-upper__menu-button"
                onClick={(()=>{})}>
                <span className="material-symbols-outlined align-middle">menu</span>        
            </button>
            <div className='position-absolute card-featured-upper__menu py-2'>
                <div className='card bg-dark border-light' >
                    <div className='position-relative card-body row my-0 p-2'>
                        {buttons.filter(findOthers).map( ({text, icon, click}, idx) => (
                            <button type="button"
                                key={idx+2}
                                className="btn border-0 btn-outline-light btn-sm d-flex text-left justify-content-between"
                                onClick={!!click? ()=>(showSpinnerIfPromise(click, idx+1)): (()=>{})}>

                                {!!text?
                                    text:''
                                }

                                <div className="btn-spinner">  
                                    {!!spinners[idx+1]? 
                                        <div
                                            className="card__menu-spinner spinner-border text-dark"
                                            role="status">
                                        </div>:<></>}

                                    {!!icon?
                                        <span className="material-symbols-outlined align-middle float-end">{icon}</span>
                                        :''
                                    }
                                </div>
                            </button>))}
                    </div>
                </div>
            </div>
        </div>
    </>)}
    

    {buttons.filter(findFirst).map( ({text, icon, click}, idx) => (
        <button type="button"
            tabIndex={0}
            key={idx}
            className="btn border-0 btn-outline-light btn-sm"
            onClick={!!click? ()=>(showSpinnerIfPromise(click, 0)): (()=>{})}>

            {!!text?
                text:''
            }

            <div className="btn-spinner">  
                {!!spinners[idx]? 
                    <div
                        className="card__menu-spinner spinner-border text-dark"
                        role="status">
                    </div>:<></>}

                {!!icon?
                    <span className="material-symbols-outlined align-middle float-end">{icon}</span>
                    :''
                }
            </div>
        </button>))}

</div>
};