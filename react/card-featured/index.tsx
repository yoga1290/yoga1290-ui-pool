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
        <div className={`card-featured animate__animated animate__fadeInUp col-12 align-self-stretch d-flex`}>

            <div className="card bg-dark col-12 border-light pointer-cursor py-2 my-4" tabIndex={0}
                style={getCSSBackgroud(backgroundImageUrl)}>
            <div className="card-body card-featured__body">

                <div className="card-featured__inner-card card bg-dark col-12 col-md-10 col-lg-8 col-sm-10 border-light offset-sm-1 offset-md-1 offset-lg-2">
                    <div className="card-body">
                        <h5 className="card-title user-select-all">{ title }</h5>
                        <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                            { subtitle }
                        </p>
                        <div className="card-text">{text}</div>

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