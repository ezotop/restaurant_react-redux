import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import {Route, Switch} from 'react-router-dom';
import {ItemPage} from '../pages';
import CookieConsent from '../cookie-consent';

import Background from './food-bg.jpg';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`, position: 'relative'}} className="app">
            <AppHeader/>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/cart" component={CartPage}/>
                <Route path="/:id" component={ItemPage}/>
            </Switch>
            <CookieConsent/>
        </div>
    )
}

export default App; // Сразу обернуло в Consumer