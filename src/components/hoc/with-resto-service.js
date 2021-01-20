import React from 'react';
import RestoServiceContext from '../resto-service-context';

const WithRestoService = () => (Wrapped) => {
    return (props) => { // Те пропсы, которые передаются в Wrapper, создали эту ф-цию чтобы передать их непосредственно в сам компонент ниже
        return ( // Возвращаем (рендерим) вёрстку
            // Обернули вёрстку в Consumer, чтобы передать value из Provider (прячем реализацию Consumer):
            <RestoServiceContext.Consumer> 
                { // Создаем контекст:
                    (RestoService) => {
                        // Мы не знаем сколько в будущем придет пропсов в компонент Wrapper, поэтому ставим рест оператор И предаем в пропсы value из Provider
                        return <Wrapped {...props} RestoService={RestoService}/>
                    }
                }
            </RestoServiceContext.Consumer>
        );
    }
};

export default WithRestoService;