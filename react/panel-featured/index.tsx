import React, { CSSProperties, ReactNode, useEffect, useRef } from "react";
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

export default ({ title, subtitle, children, backgroundImageUrl, backgroundShade }: PanelProps) => {

    const elRef : any = useRef(null);
    useEffect(() => {

        const elParent = elRef.current;

        const onScroll = (ev: any) => {
            // skip if already horizontal scrolling
            if (ev.wheelDeltaX!==0) return;

            let scrollLeft = elParent.scrollLeft + 0;
            const newX = Math.ceil(-1 * ev.wheelDeltaY + scrollLeft);

            elParent.scroll(newX, 0);
            scrollLeft = elParent.scrollLeft + 0;

            const invalidScroll = (newX>=0? newX>(scrollLeft+1): newX<0);
            if (!invalidScroll) {
                ev.preventDefault();
            }

        };


        elParent.addEventListener('wheel', onScroll);
        const destroy = () => {
            elParent.removeEventListener('wheel', onScroll);
        };
        return destroy;
    }, [elRef]);

    return (
        <div
            className={`panel-featured animate__animated animate__fadeIn col-12 align-self-stretch d-flex`}>

            <div className="panel-featured-card card bg-dark col-12 border-light pointer-cursor py-2 my-4" tabIndex={0}
                style={getCSSBackgroud(backgroundImageUrl, backgroundShade)}>
                
            <div className="panel-featured-title">
                <div className="card-title d-inline">{title}</div>
                <div className="card-subtitle mb-2 text-muted d-inline px-2">{subtitle}</div>
            </div>
            

            <div
                ref={elRef}
                className="panel-featured-body card-body">

                    {children?.map((el, idx) => (<>
                        <div className="d-inline mx-1 w-100" key={idx}>
                            {el}
                        </div>
                    </>))}

            </div>
                
            </div>

        </div>
)};