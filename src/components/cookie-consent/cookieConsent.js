import React, { useState, Component } from 'react';
import './cookieConsent.scss';

const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [dirtyPage, setDirtyPage] = useState(false);
    
    // У cookieStorage нету методов setItem и getItem и выглядит он как одна большая строка, поэтому методы нужно самому написать:
    const cookieStorage = {
        getItem: (key) => {
            // const cookies = document.cookie.split(';')
            //                                 .map(cookie => cookie.split('='))
            //                                 .reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});

            // Вместо reduce можно использовать Object.fromEntries, но нужно придумать как обрезать(trim) ключи от пробелов
            const cookies = Object.fromEntries(document.cookie.split('; ').map(cookie => cookie.split('=')));
            // Если сделать split('; ') с пробелом то пробелов не будет
            console.log(cookies);

            return cookies[key];                                                          
        },
        setItem: (key, value) => {
            document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
        }
    };

    const storageType = cookieStorage;
    const consentPropertyType = 'site_consent';

    const toggleStorage = (choise) => {
        storageType.setItem(consentPropertyType, choise);
        setShowPopup(false);
    };

    if (storageType.getItem(consentPropertyType) !== 'true' && !showPopup && !dirtyPage) { // Если в сторедж пусто/false И не показывается popup И страница чистая (не тронутая), то показываем popup и делаем страницу грязной
        setDirtyPage(true);
        setShowPopup(true);
    }
    if (storageType.getItem(consentPropertyType) === 'true' && !showPopup) { // Если в сторедж true И не показываем popup, то сразу что-то грузим
        // console.log(storageType.getItem(consentPropertyType));
        // console.log(!showPopup);
        someScripts();
    }

    return (
        <div className={showPopup ? 'popup popup_active' : 'popup'}>
            <div>Cookie?</div>
            <button className="btn_cookie" onClick={() => toggleStorage(true)}>Allow</button>
            <button className="btn_cookie" onClick={() => toggleStorage(false)}>Deny</button>
        </div>
    )
};

// class CookieConsent extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.consentPropertyType = 'site_consent';
//     // }
//     static consentPropertyType = 'site_consent';

//     state = {
//         showPopup: false,
//         dirtyPage: false
//     }

//     componentDidMount() {
//         this.hasConsented()
//     }
//     componentDidUpdate() {
//         this.hasConsented()
//     }

//     getItem = (key) => {
//         const cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});
//         return cookies[key];                                                          
//     }

//     setItem = (key, value) => {
//         document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
//     }

//     hasConsented = () => {
//         if (this.getItem(CookieConsent.consentPropertyType) !== 'true' && !this.state.showPopup && !this.state.dirtyPage) {
//             this.setState({showPopup: true, dirtyPage: true})
//         }
//         if (this.getItem(CookieConsent.consentPropertyType) === 'true' && !this.state.showPopup) {
//             // console.log(this.getItem(CookieConsent.consentPropertyType));
//             // console.log(!this.state.showPopup);
//             someScripts();
//         }
//     }

//     toggleStorage = (choise) => {
//         this.setItem(CookieConsent.consentPropertyType, choise)
//         this.setState({showPopup: false, dirtyPage: true})
//     }

//     render() {
//         return (
//             <div className={this.state.showPopup ? 'popup popup_active' : 'popup'}>
//                 <div>Cookie?</div>
//                 <button className="btn_cookie" onClick={() => this.toggleStorage(true)}>Allow</button>
//                 <button className="btn_cookie" onClick={() => this.toggleStorage(false)}>Deny</button>
//             </div>
//         )
//     }
// };

function someScripts() {
    console.log('Loading...');
}

export default CookieConsent;