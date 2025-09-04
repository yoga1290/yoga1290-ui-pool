import React from 'react';
import {
    NavLink,
} from "react-router-dom";
import './style.scss';


export type HeaderProp = {
    brand: string;
    items: ItemProp[];
};
export type ItemProp = {
    title: string;
    link?: string;
    callback?: React.MouseEventHandler;
    icon?: string;
};

export default ({ brand, items }: HeaderProp) => (<header>
        <nav className="navbar navbar-dark bg-dark  sticky-top row my-0">
            <div className="row my-0 col-12 d-flex justify-content-between">

                <a href="#"
                    className="navbar-brand text-center col-sm-12 col-md-3">
                    <strong> { brand } </strong>
                </a>
                
                <div className="navbar-nav col-sm-12 col-md-7 d-print-none">
                <ul className="nav justify-content-between">

                    {items.map( ({ title, link, icon, callback }:ItemProp) => (
                        <li className="nav-item text-center" key={link}>
                            {!!link ? 
                                (<NavLink to={link} className="nav-link text-center p-0" tabIndex={-1}>
                                    <button className='nav-btn btn p-2 m-0' tabIndex={0}>
                                        <span className="material-symbols-outlined align-middle">{ icon }</span>
                                        <div className="d-none d-sm-block d-md-inline align-middle">{ title }</div>
                                    </button>
                                </NavLink>) : ''}

                            {!!callback?
                                <button className='nav-btn btn p-2 m-0' onClick={callback} tabIndex={0}>
                                    <span className="material-symbols-outlined align-middle">{ icon }</span>
                                    <div className="d-none d-sm-block d-md-inline align-middle">{ title }</div>
                                </button> :''}

                            

                        </li>
                    ))}
                    
                </ul>
                </div>
            </div>

            
        </nav>
        
        
    </header>);