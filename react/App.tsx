import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import Header, {HeaderProp} from "./header";
import Card /*, {CardProps}*/ from "./card";
import CardWithButtons /*, {CardProps}*/ from "./card-with-buttons";

import CardWithIcon /*, {CardProps}*/ from "./card-with-icon";
import CardFeatured /*, {CardProps}*/ from "./card-featured";
import CardFeaturedWithButtons /*, {CardProps}*/ from "./card-featured-with-buttons";


import './App.scss';

let headerProps: HeaderProp = {
    brand: 'yoga1290-ui-pool',
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

const SAMPLE_CARD_WITH_ICON = 
    `<CardWithIcon 
    title='Card w/ icon'
    subtitle='[Subtitle]'
    text='[Text]'
    icon='open_in_browser' />`;
const SAMPLE_CARD_WITH_BUTTONS = 
    `<CardWithButtons
        title='Card-with-icon'
        subtitle='Subtitle'
        text='Text'
        buttons = {[ {title, icon, click} ]} />`;

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
                        </div>

                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'> &#60; CardFeatured &#62; </h1>                            
                            <div className='col-12'>
                                <CardFeatured 
                                    title={`What's this?`}
                                    text={<>This GitHub page/repo acts as NPM dependency to provide a pool of UI components that might possibily be reusable and resolve boilerplate.
                                        Currently it only has React.js components
                                    </>}
                                    buttonText='Jump to repo'
                                    click={ ()=>(window.open('https://github.com/yoga1290/yoga1290-ui-pool#readme', '_blank'))}
                                    icon='open_in_new' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeatured 
                                    title='Card-featured'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_new' />
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

                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card Featured With Buttons </h1>
                            <div className='col-12 col-sm-6 col-md-4 align-self-stretch d-flex'>
                                <CardFeaturedWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeaturedWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeaturedWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }, {
                                        text:'button2',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeaturedWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }, {
                                        text:'button2',
                                        icon:'share'
                                    }, , {
                                        text:'button3',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-6'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/card-with-buttons'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD_WITH_BUTTONS}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD_WITH_BUTTONS)}
                                    icon='content_copy' />
                            </div>
                        </div>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card with buttons</h1>

                            <div className='col-12 col-sm-6 col-md-4 align-self-stretch d-flex'>
                                <CardWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }, {
                                        text:'button2',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithButtons 
                                    title='Card-with-icon'
                                    subtitle='Subtitle'
                                    text='Text'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }, {
                                        text:'button2',
                                        icon:'share'
                                    }, , {
                                        text:'button3',
                                        icon:'share'
                                    }]} />
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
                        
                        <hr/>
                        


                    </div>
                </div>
            </HashRouter>


            
    </div>
);