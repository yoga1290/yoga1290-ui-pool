import React, {  ReactNode, useState } from 'react';
import './style.scss';


export type CollapsibleListProp = {
    children: ReactNode[]
};

export default ( { children } : CollapsibleListProp) => {
    
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    
    const quoteStack = (idx:number) => {

        const max = 4;

        if (idx < children.length && idx < max ) {
            const firstchild = idx == 0;

            return (
                <div className={!!firstchild? 'p-3':`collapsible-list-view__queue-stack`}>
                    { quoteStack(idx + 1) }
                    
                    <div className='collapsible-list-view__child'>
                        { children[idx] }
                    </div>

                    
                </div>);
        } else {
            const hasMore = (children.length - max) > 0;
            return hasMore? <>

                <div className='see-more d-block w-100 align-self-center justify-content-center text-center'>
                    <span className=' align-self-center justify-content-center text-center'>
                        + { children.length - max } more
                    </span>
                    <span
                        className="material-symbols-outlined align-middle">
                        arrow_forward
                    </span>
                </div>
            </>:<></>
        }
        return <></>
    };
    
    

    return (<>
    <div className='collapsible-list-view'>

        <div className='card bg-dark my-0 p-0 col-12'>
                
                <div
                    className='card-body row justify-content-center p-1 m-0'
                    onMouseOver={() => (setIsExpanded(true))}
                    onMouseLeave={() => (setIsExpanded(false))}
                    >
                    
                    {!!isExpanded?
                            <>{children}</>:
                            quoteStack(0)
                    }
                    
                </div>

        </div>
    </div>
    </>
    );
}