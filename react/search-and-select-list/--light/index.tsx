import React from "react";

import Elm, { FilterProp } from "../index";
import "./style.scss";

export default (elProps : FilterProp) => {

    return <>
    <div className="search-and-select-list-light m-0 p-0">
        <Elm {...elProps} />
    </div>
    </>
};