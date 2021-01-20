import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import RestoService from './services/resto-service';
import RestoServiceContext from './components/resto-service-context';
import store from './store';

import './index.scss';

const restoService = new RestoService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry> {/* Граница ошибки (иногда ей нужно принимать в себя какието данные из store, поэтому более правильно помещать ее в Provider) */}
            <RestoServiceContext.Provider value={restoService}> {/* Для контекста сервиса */}
                <Router> {/* Для маршрутизации */}
                    <App/>
                </Router>
            </RestoServiceContext.Provider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));

