import { useEffect } from "react";

export interface useHorizontalScrollProps {
    scrollableElRef: any;
    containerRef: any;
    allowHorizontalView: boolean;
}

export default ({
    containerRef,
    scrollableElRef,
    allowHorizontalView=false,
}: useHorizontalScrollProps) => {

    useEffect(() => {

        
        const elParent = scrollableElRef.current;
        const elContainer = containerRef.current;

        const destroy = () => {
            elParent.removeEventListener('wheel', onScroll);
            elParent.removeEventListener('scroll', onScroll);
        };

        if (!elParent || !elContainer) return ()=>{};
        if (!allowHorizontalView) {
            destroy();
            return ()=>{};
        }

        const onScroll = (ev: any) => {
            // skip if already horizontal scrolling
            if (ev.wheelDeltaX!==0) return;

            let scrollLeft = elParent.scrollLeft + 0;
            const newX = Math.ceil(-1 * ev.wheelDeltaY + scrollLeft);

            elParent.scroll(newX, 0);
            scrollLeft = elParent.scrollLeft + 0;

            const rightEdgeReached = ev.wheelDeltaY<0 && newX>scrollLeft; //width
            const leftEdgeReached = ev.wheelDeltaY>0 && newX<0;
            const invalidScroll = rightEdgeReached || leftEdgeReached;
            if (!invalidScroll) {                
                ev.preventDefault();
                ev.stopPropagation();
                (elContainer.scrollIntoViewIfNeeded?
                    elContainer.scrollIntoViewIfNeeded():null);
            }

        };


        elParent.addEventListener('wheel', onScroll);
        elParent.addEventListener('scroll', onScroll);
        return destroy;
    });
};