import React, { useEffect, useState } from "react";
import "./style.scss";

import PagingAndSortingResult from "./model/PagingAndSortingResult";

export type FilterProp = {
    title: string;
    onItemsQuery?: Function; // onItemsQuery(text, pageNumber): Promise<PagingAndSortingResult<any>>
    onSelectedItemsChange?: Function;
    selectedItems?: Object[];
    pathToItemTitle?: string;
    defaultItemIcon?: string;
    allowNew?: boolean;
};

export default ({   title,
                    onItemsQuery,
                    pathToItemTitle,
                    defaultItemIcon,
                    onSelectedItemsChange,
                    allowNew
                     } : FilterProp) => {

    const [result, setResult] = useState<PagingAndSortingResult<any>>({
                                    content: [],
                                    size: 0,
                                    first: true,
                                    last: true
                                });
    const [pageNumber, setPageNumber] = useState(0);
    const [query, setQuery] = useState('');
    
    const [selectedItem, _setSelectedItem] = useState([]);
    const setSelectedItem = (selectedItems: any[]) => {
        _setSelectedItem(selectedItems)

        onSelectedItemsChange?
            onSelectedItemsChange(selectedItems):()=>{};
    };

    let hasNext = !result.last;
    let hasPrevious = !result.first;

    const deepCompare = (a:any, b:any) => (JSON.stringify(a) === JSON.stringify(b));
    const isElementSelected = (a:any) => (selectedItem.filter(b=>(deepCompare(a,b))).length > 0);
    const unselectItem = (idx:number) => {
        let a = [...selectedItem];
        a.splice(idx, 1);
        setSelectedItem(a);
    };

    useEffect(() => {
        onItemsQuery(query, pageNumber).then(
            (_result:PagingAndSortingResult<Object>) => (
                setResult(_result)
            ));
    }, [pageNumber, query]);

    return <>
    <div className="search-and-select-list card col-12 d-inline-block bg-dark my-3 px-0">
        <div className="card-title">
            <input
                className="search-bar__subquery text-center col-12 mx-0"
                type="text"
                onChange={(e) => {
                    setPageNumber(0);
                    setQuery(e.target.value);
                }}
                placeholder={title} />
            <div className="search-bar__filter col-12 position-absolute">
                <span className="search-bar__filter-icon position-relative material-symbols-outlined align-middle">
                search
                </span>
            </div>
        </div>

        <div className="card-body row p-0 mx-0">

            <div className="selected-items row justify-content-center p-0 m-0">
            {!!selectedItem &&
                selectedItem.map((it, idx) => (
                    <div
                        key={idx}
                        className="card cursor-pointer mx-auto my-1 col-12 col-lg-6">

                        <div
                            onClick={ () => { unselectItem(idx) } }
                            className="card-body d-inline-flex justify-content-between">
                            <span className="material-symbols-outlined align-left">
                                check_box
                            </span>
                            {(it as any)[`${pathToItemTitle}`]}
                            <span className="material-symbols-outlined align-right">
                                {!!defaultItemIcon? defaultItemIcon:'add_notes'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        {!!hasPrevious && (<>
            <div className="align-self-stretch d-inline-block col-12 col-lg-6">
                <div 
                    className="card bg-dark d-inline-flex col-12 mx-auto my-1 cursor-pointer"
                    onClick={() => (setPageNumber(pageNumber - 1))}>
                    <div className="card-body d-inline-flex justify-content-between">
                        <span className="material-symbols-outlined align-middle">arrow_back_ios</span>
                        Previous
                    </div>
                </div>

            </div>
        </>)}

        {!!result && result.content
                    .filter( a => selectedItem.filter(b=>(deepCompare(a,b))).length == 0)
                    .map( (it, idx) =>
            <div className="align-self-stretch d-inline-flex col-12 col-lg-6" key={idx}>
                    <div 
                        className="card bg-dark d-inline-flex col-12 mx-auto my-1 cursor-pointer"
                        onClick={() => {

                            if (!isElementSelected(it)) {
                                setSelectedItem([...selectedItem, it]);
                            }
                        }}>
                        <div className="card-body d-inline-flex justify-content-between">
                            <span className="material-symbols-outlined align-left">
                                check_box_outline_blank
                            </span>
                            {(it as any)[`${pathToItemTitle}`]}
                            <span className="material-symbols-outlined align-right">
                                {!!defaultItemIcon? defaultItemIcon:'add_notes'}
                            </span>
                        </div>
                    </div>
            </div>
        ) }
        {!!result && result.content.length == 0 && !!allowNew &&
        <>
                    <div 
                        className="card bg-dark d-inline-flex col-12 mx-auto my-1 cursor-pointer"
                        onClick={() => {
                            const newItem:any = {};
                            newItem[`${pathToItemTitle}`] = query;
                            if (!isElementSelected(newItem)) {
                                setSelectedItem([...selectedItem, newItem]);
                            }
                        }}>
                        <div className="card-body d-inline-flex justify-content-between">
                            <span className="material-symbols-outlined align-middle">add</span>
                            {query}
                        </div>
                    </div>
        </>}


        {!!hasNext && (<>
            <div className="align-self-stretch d-inline-flex col-12 col-lg-6">
                <div 
                    className="card bg-dark d-inline-flex col-12 mx-auto my-1 cursor-pointer"
                    onClick={() => (setPageNumber(pageNumber + 1))}>
                    <div className="card-body d-inline-flex justify-content-between">
                        Next
                        <span className="material-symbols-outlined align-middle">arrow_forward_ios</span>
                    </div>
                </div>

            </div>
        </>)}


        </div>
    </div>
    </>
};