import React, { ReactNode } from "react";
import './style.scss';

export type CardProps = {
    title: string;
    subtitle?: string;
    text?: string | ReactNode;

    click?: React.MouseEventHandler<HTMLDivElement>;
    icon?: string;
};
const doNothing: React.MouseEventHandler<HTMLDivElement> = () => {};

export default ({ title, text, subtitle, click, icon }: CardProps) => (
        <div className={`card-with-icon animate__animated animate__fadeInUp col-12 align-self-stretch d-flex text-center`}>

            <div className="card bg-dark col-12 border-light pointer-cursor py-2 my-4" tabIndex={0} onClick={!!click? click:doNothing}>
            <div className="card-body">
                <span className="material-symbols-outlined align-middle p-5 fs-1">{ icon }</span>
                <h5 className="card-title user-select-all">{ title }</h5>
                <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                    { subtitle }
                </p>
                <p className="card-text">{text}</p>
            </div>
            </div>

        </div>
    )