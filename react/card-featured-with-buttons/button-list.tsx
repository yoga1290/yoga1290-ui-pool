import React from "react";

export type ButtonProps = {
    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    text?: string;
};

export type ButtonListProps = {
    buttons: ButtonProps[]
};

const firstTwo = (_o:any, i:number) => (i < 2);
const selectAfterThird = (_o:any, i: number) => (i >= 2);

export default ({ buttons }: ButtonListProps) => (

<div className=' col-12'>
    
    
    {(buttons.length > 3) && (<>
        <button type="button"
            tabIndex={0}
            className="btn border-0 btn-outline-light btn-sm card-featured-upper__menu-button"
            onClick={(()=>{})}>
            <span className="material-symbols-outlined align-middle">menu</span>        
        </button>
        <div className='position-absolute card-featured-upper__menu'>
            <div className='card bg-dark border-light'>
                <div className='position-relative card-body  row'>
                    {buttons.filter(selectAfterThird).map( ({text, icon, click}, idx) => (
                        <button type="button"
                            key={(idx+2)}
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
            </div>
        </div>
    </>)}
    

    {buttons.filter(firstTwo).map( ({text, icon, click}, idx) => (
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