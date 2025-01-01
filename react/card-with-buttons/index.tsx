import React, { ReactNode } from "react";
import ButtonList, {ButtonProps} from "./button-list";
import './style.scss';

export type CardProps = {
    title: string;
    subtitle?: string;
    text?: string | ReactNode;

    buttons?: ButtonProps[]
};

export default ({ title, text, subtitle, buttons }: CardProps) => (
        <div className={`card-with-buttons animate__animated animate__fadeInUp col-12 align-self-stretch d-flex`}>

            <div className="card bg-dark col-12 border-light pointer-cursor py-2 my-4" tabIndex={0}>
            <div className="card-body">
                <h5 className="card-title user-select-all">{ title }</h5>
                <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                    { subtitle }
                </p>
                <div className="card-text">{text}</div>

                {!!buttons && (
                    <div className="buttons-list row float-end">
                        <ButtonList 
                            buttons={buttons}
                        />
                    </div>)}

            </div>
            </div>

        </div>
    )