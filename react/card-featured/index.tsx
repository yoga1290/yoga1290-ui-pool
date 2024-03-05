import React, { CSSProperties, ReactNode } from "react";
import './style.scss';


export type CardProps = {
    title: string;
    subtitle?: string;
    text?: string | ReactNode;
    backgroundImageUrl?: string;

    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    buttonText?: string;
};

interface BackgroundImage extends CSSProperties {
    ['backgroundImage']: string;
}
const getCSSBackgroud = (backgroundImageUrl: string = '') => ({
        'backgroundImage':
            `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${backgroundImageUrl})`
        } as BackgroundImage
);

export default ({ title, text, subtitle, click, icon, buttonText, backgroundImageUrl }: CardProps) => (
        <div className={`card-featured animate__animated animate__fadeInUp col-12 d-inline-block`}>

            <div className="card bg-dark col-12 border-light pointer-cursor d-inline-block py-2 my-4" tabIndex={0}>
            <div className="card-body card-featured__body"
                 style={getCSSBackgroud(backgroundImageUrl)}>

                <div className="card-featured__inner-card card bg-dark col-12 offset-md-3 col-md-8 offset-lg-3 col-lg-6 offset-0 offset-sm-2 col-sm-8 border-light d-inline-block py-2">
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
                
            </div>

        </div>
    )