import React from "react";

export type ButtonProps = {
    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    text?: string;
};

export type ButtonListProps = {
    buttons: ButtonProps[]
};

const findFirst = (_o:any, i:number) => (i == 0);
const findOthers = (_o:any, i: number) => (i > 0);

export default ({ buttons }: ButtonListProps) => (

<div className='col-12'>
    
    
    {(buttons.length > 1) && (<>
        <div className="card-featured-upper__menu-container d-inline">
            <button type="button"
                tabIndex={0}
                className="btn border-0 btn-outline-light btn-sm card-featured-upper__menu-button"
                onClick={(()=>{})}>
                <span className="material-symbols-outlined align-middle">menu</span>        
            </button>
            <div className='position-absolute card-featured-upper__menu py-2'>
                <div className='card bg-dark border-light'>
                    <div className='position-relative card-body row my-0'>
                        {buttons.filter(findOthers).map( ({text, icon, click}, idx) => (
                            <button type="button"
                                key={(idx+2)}
                                className="btn border-0 btn-outline-light btn-sm d-flex justify-content-between"
                                onClick={!!click? click: (()=>{})}>

                                {!!text?
                                    text:''
                                }

                                {!!icon?
                                    <span className="material-symbols-outlined align-middle float-end">{icon}</span>
                                    :''
                                }
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
            onClick={!!click? click: (()=>{})}>

            {!!text?
                text:''
            }

            {!!icon?
                <span className="material-symbols-outlined align-middle">{icon}</span>
                :''
            }
        </button>))}

</div>
);