import React, { ReactNode } from "react";
import './style.scss';

export type CardProps = {
    title: string;
    subtitle?: string;
    text?: string | ReactNode;

    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    buttonText?: string;
};

export default ({ title, text, subtitle, click, icon, buttonText }: CardProps) => (
        <div className={`card-1 animate__animated animate__fadeInUp col-12 d-inline-block`}>

            <div className="card bg-dark col-12 border-light pointer-cursor d-inline-block py-2 my-4" tabIndex={0}>
            <div className="card-body">
                <h5 className="card-title user-select-all">{ title }</h5>
                <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                    { subtitle }
                </p>
                <p className="card-text">{text}</p>

                <div className="row float-end">
                        <button type="button" className="btn border-0 btn-outline-light btn-sm" tabIndex={0}            
                            onClick={!!click? click: (()=>{})}>

                                {!!buttonText?
                                    buttonText:''
                                }

                                {!!icon?
                                    <span className="material-symbols-outlined align-middle">{icon}</span>
                                    :''
                                }
                    
                        </button>
                </div>

            </div>
            </div>

        </div>
    )