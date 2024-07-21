import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import ButtonList, {ButtonProps} from "./button-list";
import './style.scss';


export type CardProps = {
    title: string|ReactNode;
    subtitle?: string;
    text?: string | ReactNode;
    backgroundImageUrl?: string;

    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    buttons?: ButtonProps[]
};

export type CarousalProps = {
    cards: CardProps[],
    delay?: number,
    className?: string,
};

interface BackgroundImage extends CSSProperties {
    ['backgroundImage']: string;
}
const getCSSBackgroud = (backgroundImageUrl: string = '') => ({
        'backgroundImage':
            `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${backgroundImageUrl})`
        } as BackgroundImage
);

export default ({ cards, delay=5 }: CarousalProps) => {

    const [cardIdx, setCardIdx] = useState<number>(0);

    let currentPause = false;
    const setPause = (pause :boolean) => {
        currentPause = pause;
    };
    
    useEffect(() => {
        
        const intrv = setInterval(()=> {

            if(!currentPause) {
                setCardIdx( (cardIdx+1) % cards.length );
            }
            
        }, delay * 1000);

        return () => ( clearInterval(intrv) )
    });

    return (
    <div className={`card-featured-with-buttons-carousal position-relative`}
            onMouseOut={() => { setPause(false); }}>
        
        { cards.map( ({ title, text, subtitle, backgroundImageUrl, buttons}, idx) => (
            
            <div className={`card-featured-with-buttons align-self-stretch d-flex ${cardIdx==idx? 'position-relative':'position-absolute'}`}>

                <div className={`card bg-dark col-12 border-light pointer-cursor py-2 my-4 ${cardIdx==idx? 'animate__fadeInRight':'animate__fadeOutLeft'} animate__animated animate__delay-1s`} tabIndex={0}
                    style={getCSSBackgroud(backgroundImageUrl)}
                        onMouseOver={() => {setPause(true);}}>

                    <div className={`card-body card-featured__body`}>

                        <h5 className="card-title user-select-all">{ title }</h5>
                        <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                                    { subtitle }
                        </p>
                        <p className={`card-text text-muted ${cardIdx==idx? 'animate__fadeInUp animate__delay-2s':'animate__fadeOutDown'} animate__animated`}>{text}</p>


                        {!!buttons && (
                            <div className="row float-end buttons-list">
                                <ButtonList 
                                    buttons={buttons}
                                />
                            </div>)}

                    </div>
                    
                </div>

            </div>
        ))}
    </div>);
}