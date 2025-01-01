import React, { CSSProperties, ReactNode } from "react";
import ButtonList, {ButtonProps} from "./button-list";
import './style.scss';


export type CardProps = {
    title: string;
    subtitle?: string;
    text?: string | ReactNode;
    backgroundImageUrl?: string;

    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    buttons?: ButtonProps[]
};

interface BackgroundImage extends CSSProperties {
    ['backgroundImage']: string;
}
const getCSSBackgroud = (backgroundImageUrl: string = '') => ({
        'backgroundImage':
            `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${backgroundImageUrl})`
        } as BackgroundImage
);

export default ({ title, text, subtitle, backgroundImageUrl, buttons }: CardProps) => (
        <div className={`card-featured-with-buttons animate__animated animate__fadeInUp col-12 align-self-stretch d-flex`}>

            <div className="card bg-dark col-12 border-light pointer-cursor py-2 my-2" tabIndex={0}
                style={getCSSBackgroud(backgroundImageUrl)}>
            <div className="card-body card-featured__body">

                <h5 className="card-title user-select-all">{ title }</h5>
                <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                            { subtitle }
                </p>
                <div className="card-text">{text}</div>


                {!!buttons && (
                    <div className="row float-end buttons-list">
                        <ButtonList 
                            buttons={buttons}
                        />
                    </div>)}

            </div>
                
            </div>

        </div>
    )