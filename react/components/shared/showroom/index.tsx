import React from "react";
import './style.scss'; 

export type ShowRoomProps = {
    title: string;
    subtitle?: string;
    text?: string;
    url: string;
};

let cardList:any[] = [{
    title: '',
    url: ''
}, {
    title: '',
    url: ''
}];

export default (_prop: ShowRoomProps) => (


        <div className={`showroom col-xs-12`}>


        {
            cardList.map(
                ({ title, url }) => (
                
                    <div className="card bg-dark col-3 px-0 mx-0 border-light pointer-cursor d-inline-block py-1 my-4">
                        <div className="card-body">
                            <h5 className="card-title">{ title }</h5>
                            <p className={`card-subtitle mb-2 text-muted invisible`}>
                            </p>
                            <p className="card-text">{title}</p>
            
                            <div className="row float-end">
                                    <button type="button" className="btn border-0 btn-outline-light btn-sm"
                                        onClick={() => (window.open(url, '_blank'))}>
                                        <span className="material-icons">open_in_new</span>
                                    </button>
                            </div>
            
                        </div>
                    </div>)
            )
        }

        </div>
    )