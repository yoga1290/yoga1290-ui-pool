import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import Header, {HeaderProp} from "./header";
import Card /*, {CardProps}*/ from "./card";
import CardWithMenu /*, {CardProps}*/ from "./card-with-menu";
import CardWithIcon /*, {CardProps}*/ from "./card-with-icon";
import CardFeatured /*, {CardProps}*/ from "./card-featured";


import './App.scss';

let headerProps: HeaderProp = {
    brand: 'Sample Header',
    items: [{
        title: 'Item 1',
        link: '/#item-1',
        icon: 'play_circle'
    }, {
        title: 'Item 2',
        link: '/item-2',
        icon: 'play_circle'
    }, {
        title: 'Item 3',
        link: '/item-3',
        icon: 'play_circle'
    }, {
        title: 'Item 4',
        link: '/item-4',
        icon: 'play_circle'
    }]
};

const copyToClipboard = (copyText:string) => ( ()=>(navigator.clipboard.writeText(copyText)) );

const SAMPLE_CARD = 
    `<Card 
    title='Card-with-button'
    subtitle='Subtitle'
    text='Text'
    icon='open_in_browser'
    click={Function} />`;
const SAMPLE_CARD_WITH_ICON = 
    `<CardWithIcon 
    title='Card w/ icon'
    subtitle='[Subtitle]'
    text='[Text]'
    icon='open_in_browser' />`;
const SAMPLE_CARD_WITH_MENU = 
    `<CardWithMenu 
        title='Card-with-icon'
        subtitle='Subtitle'
        text='Text'
        icon='open_in_browser' />`;

const SAMPLE_HEADER = 
    `<Header
        brand= 'Sample Header'
        items={[{
            title: 'Item 1',
            link: '/#item-1',
            icon: 'play_circle'
        }]} />`;
const SAMPLE_CARD_FEATURED =
    `<CardFeatured 
        title='Card-featured'
        subtitle='Subtitle'
        text='Text'
        icon='open_in_browser' />`;


export default () => (
  <div>            
            <HashRouter>
               <Header  brand={headerProps.brand}
                        items={headerProps.items} />

                <div className="container-fluid">
                    <div className="mx-auto col-md-10 col-sm-12 col-12">

                        <Routes>
                            <Route 
                                path="/hacks"
                                element={<div/>}
                            />
                        </Routes>

                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Header</h1>
                            <div className='col-12'>
                                <Header  brand={headerProps.brand}
                                    items={headerProps.items} />
                            </div>
                            <div className='col-12'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card'
                                    text= {<pre className='user-select-all'>{SAMPLE_HEADER}</pre>}
                                    click={copyToClipboard(SAMPLE_HEADER)}
                                    icon='content_copy' />
                            </div>
                        </div>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card with button</h1>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <Card 
                                    title='Card & button'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-6'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD)}
                                    icon='content_copy' />
                            </div>
                        </div>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card with icon</h1>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithIcon 
                                    title='Card w/ icon'
                                    subtitle='[Subtitle]'
                                    text='[Text]'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-6'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card-with-icon'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD_WITH_ICON}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD_WITH_ICON)}
                                    icon='content_copy' />
                            </div>
                        </div>



                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card with Menu</h1>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithMenu 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-6'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card-with-menu'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD_WITH_MENU}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD_WITH_MENU)}
                                    icon='content_copy' />
                            </div>
                        </div>




                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card Featured</h1>                            
                            <div className='col-12'>
                                <CardFeatured 
                                    title='Card-featured'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeatured 
                                    title='Card-featured'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-6'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card-featured'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD_FEATURED}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD_FEATURED)}
                                    icon='content_copy' />
                            </div>
                        </div>
                        <hr/>
                        


                    </div>
                </div>
            </HashRouter>


            
    </div>
);