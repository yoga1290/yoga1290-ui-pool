import React, { useRef } from "react";
import './style.scss';

import usePagingAndSorting, { UsePagingAndSortingOptions } from "./usePagingAndSorting";
import useHorizontalScroll from "./useHorizontalScroll";

interface PagingButtonsProps {
    hasNext: boolean;
    hasPrevious: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

const PagingButtons: React.FC<PagingButtonsProps> = ({
    hasNext,
    hasPrevious,
    onPrevious,
    onNext,
}) => (
    (hasNext || hasPrevious)?
    <>
        {/* <!-- Pagination Buttons --> */}
        <div className="browser-nav__arrows d-flex align-items-center">
            {/* <!-- Back Arrow --> */}
            <button
                aria-label="Go back"
                className={`browser-nav__arrow browser-nav__arrow--back
                            ${!!hasPrevious? '':'browser-nav__arrow--disabled'}`}
                onClick={onPrevious}
                disabled={!hasPrevious}
            >
                <span
                    className={`
                        browser-nav__icon
                        browser-nav__icon--sm
                        material-symbols-outlined
                        align-middle
                        ${hasPrevious ? 'browser-nav__icon--clickable' : ''}
                    `}
                >
                    arrow_back_ios
                </span>
            </button>
            {/* <!-- Forward Arrow --> */}
            <button
                aria-label="Go forward"
                className={`
                    browser-nav__arrow
                    browser-nav__arrow--forward
                    ${!!hasNext? '':'browser-nav__arrow--disabled'}
                `}
                onClick={onNext}
                disabled={!hasNext}
            >
                <span
                    className={`
                        browser-nav__icon
                        browser-nav__icon--sm
                        material-symbols-outlined
                        align-middle
                        ${hasNext ? 'browser-nav__icon--clickable' : ''}
                    `}
                >
                    arrow_forward_ios
                </span>
            </button>
        </div>
    </>: <></>
);

interface SearchBarProps {
    title?: string;
    query: string;
    onQueryChange: (query: string) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    onPrevious: () => void;
    onNext: () => void;
    showSpinner: boolean;
    materialIcon?: string;
    allowHorizontalView?: boolean;
    isHorizontalView?: boolean;
    setIsHorizontalView?: (flag: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    title,
    query,
    onQueryChange,
    hasNext,
    hasPrevious,
    onPrevious,
    onNext,
    showSpinner,
    materialIcon,
    allowHorizontalView,
    isHorizontalView,
    setIsHorizontalView,
}) => (
    <div className="browser-nav w-100 d-flex" data-purpose="browser-navigation-bar">
        {/* <!-- Center Search/Address Bar --> */}
        <div className="browser-nav__address-bar flex-grow-1 d-flex align-items-center justify-content-between">
            <div className="browser-nav__address-bar-info d-flex align-items-center col-12">
                
                {!!materialIcon? 
                <span className="browser-nav__icon material-symbols-outlined align-middle"> {materialIcon} </span>
                    :<></>}
                <input
                    type="text"
                    className="browser-nav__address-bar-input col-12"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={title}
                    aria-label="Address bar"
                />
            </div>
            <i
                className="browser-nav__icon browser-nav__icon--xs browser-nav__icon--muted browser-nav__icon--clickable"
                data-lucide="more-vertical"
            ></i>
        </div>

        {/* <!-- Right Utilities --> */}
        <div className="browser-nav__utilities d-flex align-items-center">
            <div className="position-absolute">
                {showSpinner ? (
                    <span
                        className="spinner-border spinner-border-sm browser-nav__icon--spinner"
                        role="status"
                        aria-label="Loading"
                    />
                ) : (
                    <span className="browser-nav__icon browser-nav__icon--search material-symbols-outlined align-middle">
                        search
                    </span>
                )}
            </div>

            <PagingButtons
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onPrevious={onPrevious}
                onNext={onNext}
            />


            {!!allowHorizontalView?
            <>
                <span className="browser-nav__divider"></span>
                <span
                    className="browser-nav__icon browser-nav__icon--sm browser-nav__icon--clickable material-symbols-outlined align-middle"
                    onClick={() => ( setIsHorizontalView(!!!isHorizontalView) )}>
                    {!!isHorizontalView? 'height':'arrow_range'}
                </span>
            </> : <></>}
            
        </div>
    </div>
);

export interface SearchAndSelectAndSortPanelProps<T = any>
    extends UsePagingAndSortingOptions<T> {
    /** Optional custom row renderer; defaults to a JSON preview. */
    renderItem?: (item: T, isSelected: boolean) => React.ReactNode;

    title?: string;
}

export default function SearchAndSelectAndSortPanel<T = any>(
    props: SearchAndSelectAndSortPanelProps<T>
) {
    const { renderItem,
            maxSelection,
            materialIcon,
            allowHorizontalView,
            title,
            allowVerticalInlineDisplay,
            ...hookOptions } = props;

    const {
        result,
        showSpinner,
        query,
        setQuery,
        hasNext,
        hasPrevious,
        goToNextPage,
        goToPreviousPage,
        selectedItem,
        isElementSelected,
        toggleItemSelection,
        setSelectedItem,
        isHorizontalView,
        setIsHorizontalView,
    } = usePagingAndSorting<T>(hookOptions);

    const containerRef : any = useRef(null);
    const scrollableElRef : any = useRef(null);
    // if (allowHorizontalView && isHorizontalView) {
        useHorizontalScroll({containerRef, scrollableElRef,
                            allowHorizontalView: allowHorizontalView&&isHorizontalView});
    // }

    const allowSelection = maxSelection > selectedItem.length;


    const handleToggle = (item: T) => {
        if (allowSelection) {
            toggleItemSelection(item);
        } else {
            const alreadySelected = isElementSelected(item);
            if (maxSelection > 0) {
                setSelectedItem(alreadySelected ? [] : [item]);
            }
        }
    };

    const defaultRenderItem = (item: T) => (
        <span className="search-and-select-and-sort-panel__item-preview">
            {typeof item === 'string' ? item : JSON.stringify(item)}
        </span>
    );


    return (
        <div 
            ref={containerRef}
            className="search-and-select-and-sort-panel card">
            <div className="card-body px-0">
                <SearchBar
                    title={title}
                    query={query}
                    onQueryChange={setQuery}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                    onPrevious={goToPreviousPage}
                    onNext={goToNextPage}
                    showSpinner={Boolean(showSpinner)}
                    materialIcon={materialIcon}
                    allowHorizontalView={Boolean(allowHorizontalView)}
                    isHorizontalView={Boolean(isHorizontalView)}
                    setIsHorizontalView={setIsHorizontalView}
                />
                <ul
                    ref={scrollableElRef}
                    className={`search-and-select-and-sort-panel__list
                                ${!!isHorizontalView? 'search-and-select-and-sort-panel__list__list--horizontal'
                                                    : 'search-and-select-and-sort-panel__list__list--vertical'}
                                list-unstyled mb-0`}>
                    {result.content.length === 0 && !showSpinner && (
                        <li className="search-and-select-and-sort-panel__empty px-3 py-2 text-muted">
                            No results
                        </li>
                    )}
                    {result.content.map((item, idx) => {
                        const selected = isElementSelected(item);
                        return (
                            <li
                                key={idx}
                                className={`
                                    search-and-select-and-sort-panel__item
                                    ${allowVerticalInlineDisplay? 'search-and-select-and-sort-panel__item--inline':''}
                                    ${selected ? 'search-and-select-and-sort-panel__item--selected' : ''}
                                    align-items-center
                                `}
                                onClick={() => handleToggle(item)}
                                role="option"
                                aria-selected={selected}
                            >
                                {!!allowSelection?
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={selected}
                                    onChange={() => handleToggle(item)}
                                    onClick={(e) => e.stopPropagation()}
                                />:<></>}
                                {renderItem ? renderItem(item, selected) : defaultRenderItem(item)}
                            </li>
                        );
                    })}
                </ul>

                {selectedItem.length > 0 && (
                    <div className="search-and-select-and-sort-panel__selection-summary px-3 py-2 text-muted small">
                        {selectedItem.length} item{selectedItem.length > 1 ? 's' : ''} selected
                    </div>
                )}
            </div>
        </div>
    );
}