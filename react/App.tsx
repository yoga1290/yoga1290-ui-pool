import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import Header, {HeaderProp} from "./header";
import Card /*, {CardProps}*/ from "./card";
import CardWithButtons /*, {CardProps}*/ from "./card-with-buttons";

import CardWithIcon /*, {CardProps}*/ from "./card-with-icon";
import CardFeatured /*, {CardProps}*/ from "./card-featured";
import CardFeaturedWithButtons /*, {CardProps}*/ from "./card-featured-with-buttons";
import CardFeaturedWithButtonsCarousal from './card-featured-with-buttons-carousal';
import SearchAndSelectList from './search-and-select-list'; 
import Modal from './modal';
import CarousalStack from './carousal-stack';

import './App.scss';
import PagingAndSortingResult from './search-and-select-list/model/PagingAndSortingResult';

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

const SAMPLE_SEARCH_AND_SELECT_LIST = `<SearchAndSelectList 
                    title='Search some entities'
                    defaultItemIcon='queue_music'
                    allowNew={false}
                    pathToItemTitle='someDisplayKey'
                    onSelectedItemsChange={(selectedItems:any[]) => (console.log(selectedItems))}
                    onItemsQuery={(_text: string, _pageNumber: number) =>(
                                Promise.resolve({
                                    content: [{
                                        someDisplayKey: \`item \${!!text? \`for \${text}\`:''}\`,
                                        somekey: 'somevalue'
                                    }],
                                    first: false,
                                    last: false,
                                    size: 2
                                } as PagingAndSortingResult<any>))}/>`;
const SAMPLE_MODAL = `<Modal 
    show={modalState}
    onClose={() => ( setModalState(false) ) }
    content={<>
        <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
            < ... />
        </div>
    </>}
/>`;

const cardsFeaturedWithButtonsCarousal = [
    {
        title: `Card#1`,
        text: <>This GitHub page/repo acts as NPM dependency to provide a pool of UI components that might possibily be reusable and resolve boilerplate.
                Currently it only has React.js components
            </>,
        buttons:[{
            text: 'Read more',
            click: ()=>(window.open('https://github.com/yoga1290/yoga1290-ui-pool#readme', '_blank')),
            icon:'open_in_new'
        }],
    }, {
        title: `Card#2`,
        text: <>This GitHub page/repo acts as NPM dependency to provide a pool of UI components that might possibily be reusable and resolve boilerplate.
                Currently it only has React.js components
            </>,
        buttons:[{
            text: 'Read more',
            click: ()=>(window.open('https://github.com/yoga1290/yoga1290-ui-pool#readme', '_blank')),
            icon:'open_in_new'
        }],
    }, {
        title: `Card#3`,
        text: <>This GitHub page/repo acts as NPM dependency to provide a pool of UI components that might possibily be reusable and resolve boilerplate.
                Currently it only has React.js components
            </>,
        buttons:[{
            text: 'Read more',
            click: ()=>(window.open('https://github.com/yoga1290/yoga1290-ui-pool#readme', '_blank')),
            icon:'open_in_new'
        }],
    },];
export default () => {

    const [modalState, setModalState] = useState<boolean>(false);

  return <div>            
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
                            <h1 className='col-12 fs-1 bg-dark'> &#60; Header &#62; </h1>
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
                            <h1 className='col-12 fs-1 bg-dark'> &#60; CardFeaturedWithButtonsCarousal &#62; </h1>                            
                            <div className='col-12'>
                                <CardFeaturedWithButtonsCarousal
                                    delay={7}
                                    cards={cardsFeaturedWithButtonsCarousal} />
                            </div>
                            <div className='col-md-8 col-sm-12 col-12'>
                                <CardFeaturedWithButtonsCarousal
                                    delay={4}
                                    cards={cardsFeaturedWithButtonsCarousal} />
                            </div>
                            <div className='col-md-4 col-sm-12 col-12'>
                                <CardFeaturedWithButtonsCarousal
                                    delay={5}
                                    cards={cardsFeaturedWithButtonsCarousal} />
                            </div>
                            
                        </div>

                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Card Featured With Buttons </h1>
                            <div className='col-12 col-sm-6 col-md-4 align-self-stretch d-flex'>
                                <CardFeaturedWithButtons 
                                    title='Card-featured-with-buttons'
                                    subtitle='Subtitle'
                                    text='Text'
                                    icon='open_in_browser' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardFeaturedWithButtons 
                                    title='Card-featured-with-buttons'
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
                                    title='Card-featured-with-buttons'
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
                                    title='Card-with-buttons'
                                    subtitle='Subtitle'
                                    text='Text' />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithButtons 
                                    title='Card-with-buttons'
                                    subtitle='Subtitle'
                                    text='Text'
                                    buttons={[{
                                        text:'button1',
                                        icon:'share'
                                    }]} />
                            </div>
                            <div className='col-12 col-sm-6 col-md-4'>
                                <CardWithButtons 
                                    title='Card-with-buttons'
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
                                    subtitle='yoga1290-ui-pool/react/card-featured-with-buttons'
                                    text= {<pre className='user-select-all'>{SAMPLE_CARD_WITH_ICON}</pre>}
                                    click={copyToClipboard(SAMPLE_CARD_WITH_ICON)}
                                    icon='content_copy' />
                            </div>
                        </div>
                        
                        <hr/>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Search-And-Select-List</h1>

                            <div className='col-12'>
                                <SearchAndSelectList 
                                        title='Search some entities'
                                        defaultItemIcon='queue_music'
                                        allowNew={false}
                                        pathToItemTitle='someDisplayKey'
                                        onSelectedItemsChange={(selectedItems:any[]) => (console.log(selectedItems))}
                                        onItemsQuery={(text: string, _pageNumber: number) =>(
                                                    Promise.resolve({
                                                        content: [{
                                                            someDisplayKey: `item ${!!text? `for ${text}`:''}`,
                                                            somekey: 'somevalue'
                                                        }, {
                                                            someDisplayKey: `item#2 ${!!text? `for ${text}`:''}`,
                                                            somekey: 'somevalue2'
                                                        }, {
                                                            someDisplayKey: `item#3 ${!!text? `for ${text}`:''}`,
                                                            somekey: 'somevalue3'
                                                        }],
                                                        first: false,
                                                        last: false,
                                                        size: 2
                                                    } as PagingAndSortingResult<any>))}/>
                            </div>

                            <div className='col-12'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/search-and-select-list'
                                    text= {<pre className='user-select-all'>
                                        {SAMPLE_SEARCH_AND_SELECT_LIST}
                                    </pre>}
                                    click={copyToClipboard(SAMPLE_SEARCH_AND_SELECT_LIST)}
                                    icon='content_copy' />
                            </div>

                        </div>
                        
                        <hr/>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Modal</h1>

                            <div className='col-12 px-0 mx-0'>
                                <button className='form-control btn-primary'
                                        onClick={ () => (setModalState(true))}>Open Modal</button>
                                <Modal 
                                    show={modalState}
                                    onClose={() => ( setModalState(false) ) }
                                    content={<>
                                        <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
                                            <CardFeaturedWithButtons 
                                                title='Content'
                                                subtitle=''
                                                text='Click elsewhere to close'
                                                icon='open_in_browser' />
                                        </div>
                                    </>}
                                />
                            </div>

                            <div className='col-12'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/modal'
                                    text= {<pre className='user-select-all'>
                                        {SAMPLE_MODAL}
                                    </pre>}
                                    click={copyToClipboard(SAMPLE_MODAL)}
                                    icon='content_copy' />
                            </div>

                        </div>
                        
                        <hr/>


                        <div className='row'>
                            <h1 className='col-12 fs-1 bg-dark'>Carousal Stack</h1>

                            <div className='col-12 px-0 mx-0'>
                                {/* [WIP] */}
                                    <CarousalStack
                                        content={[ '', '','', '', '', '', '']}
                                        />
                            </div>

                            <div className='col-12'>
                                <Card 
                                    title='Code'
                                    subtitle='yoga1290-ui-pool/react/carousal-stack'
                                    text= {<pre className='user-select-all'>
                                        [WIP]: for now you use Tab and shift+Tap buttons.
                                    </pre>}
                                    click={copyToClipboard('')}
                                    icon='content_copy' />
                            </div>

                        </div>
                        
                        <hr/>
                        
                        


                    </div>
                </div>
            </HashRouter>


            
    </div>;
};