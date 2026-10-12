import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import './style.scss';


export type CardProps = {
    title: string | ReactNode;
    subtitle?: string;
    text?: string | ReactNode;
    backgroundImageUrl?: string;
    backgroundShade?: boolean;

    click?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    buttonText?: string;
};

export type CardListProps = {
    cards: CardProps[];
};

interface BackgroundImage extends CSSProperties {
    ['backgroundImage']: string;
}
// const getCSSBackgroud = (backgroundImageUrl: string = '', shade:boolean=true) => ({
//         'backgroundImage':
//             `linear-gradient(rgba(0, 0, 0, ${shade? 0.1:0}), rgba(0, 0, 0, ${shade? 0.3:0})), url(${backgroundImageUrl})`,
//         } as BackgroundImage
// );

const renderNestedCards = (cards:any[], hideCardIdx: number, idx:number) => {

    if (idx < 0) return <></>;

    const { title, text, subtitle, click, icon, buttonText, backgroundImageUrl, backgroundShade } = cards[idx];
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (_event) => (
                            !!click? click: (()=>{})
                        );

    return <div className="card-level"
                style={{
                    zIndex: cards.length-idx, //cards.length-idx+hideCardIdx,
                    // opacity: ( (hideCardIdx>idx? 0:cards.length-idx+hideCardIdx+1) /cards.length),
                    // scale: (hideCardIdx>idx? 0.5:1-((cards.length-idx+hideCardIdx)/cards.length) )
                    }}>
        {/* {renderNestedCards(cards, hideCardIdx, idx - 1)} */}
        
        <div className={`card ${hideCardIdx>idx? 'hide-card':'visible-card'}`}
                tabIndex={0} >
    

            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className={`card-subtitle user-select-all mb-2 text-muted ${subtitle ? '':'invisible'}`}>
                    { subtitle }
                </p>
                <p className="card-text">{text}</p>
                {!!buttonText?
                
                <a href="#" className="btn btn-primary" tabIndex={0}            
                    onClick={handleClick}>

                        {!!buttonText?
                            buttonText:''
                        }

                        {!!icon?
                            <span className="material-symbols-outlined align-middle">{icon}</span>
                            :''
                        }
                    </a>: <></>
                }
            </div>
        </div>
        {renderNestedCards(cards, hideCardIdx, idx - 1)}

    </div>
};

export default ({ cards }: CardListProps,
                animate:boolean=true,
) => {

        const [hideCardIdx, setHideCardIdx] = useState(-1);
        const displayNextCard = () => {
                if (hideCardIdx==cards.length-1) {
                    setHideCardIdx(-1);
                } else {
                    setHideCardIdx(hideCardIdx + 1);
                }
        };

        useEffect(() => {
            if(!!animate) {
                const intrId = setInterval(displayNextCard, 2000);
                return ()=>(clearInterval(intrId));
            }
            return ()=>{};
        });


        return <div className={`cards-stacked-animated animate__animated animate__fadeIn col-12 align-self-stretch d-flex`}>

            <div className="card-stack"
                    onClick={() => {
                        displayNextCard();
                    }}>

                {renderNestedCards(cards, hideCardIdx, cards.length-1)}
            </div>

        </div>
};