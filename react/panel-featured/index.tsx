import React, { CSSProperties, ReactNode } from "react";
import './style.scss';


export type PanelProps = {

    icon?: string;
    title: string;
    subtitle?: string;

    text?: string[] | ReactNode[];
    backgroundImageUrl?: string;
    backgroundShade?: boolean;
    children?: any[] | ReactNode[];


    click?: React.MouseEventHandler<HTMLButtonElement>;
    buttonText?: string;
};

interface BackgroundImage extends CSSProperties {
    ['backgroundImage']: string;
}
const getCSSBackgroud = (backgroundImageUrl: string = '', shade:boolean=true) => ({
        'backgroundImage':
            `linear-gradient(rgba(0, 0, 0, ${shade? 0.9:0}), rgba(0, 0, 0, ${shade? 0.5:0})), url(${backgroundImageUrl})`
        } as BackgroundImage
);

export default ({ title, subtitle, children, backgroundImageUrl, backgroundShade }: PanelProps) => (
        <div className={`panel-featured animate__animated animate__fadeIn col-12 align-self-stretch d-flex`}>

            <div className="panel-featured-card card bg-dark col-12 border-light pointer-cursor py-2 my-4" tabIndex={0}
                style={getCSSBackgroud(backgroundImageUrl, backgroundShade)}>
                
            <div className="panel-featured-title">
                <div className="card-title d-inline">{title}</div>
                <div className="card-subtitle mb-2 text-muted d-inline px-2">{subtitle}</div>
            </div>
            

            <div className="panel-featured-body card-body">

                    {children?.map((el, idx) => (<>
                        <div className="d-inline mx-1 w-100" key={idx}>
                            {el}
                        </div>
                    </>))}

            </div>
                
            </div>

        </div>
    )