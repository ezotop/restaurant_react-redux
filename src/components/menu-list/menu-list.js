import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() { // Задача: получить данные с сервиса и отправить actions в store
        this.props.menuRequested(); // Включает Spinner
        const {RestoService} = this.props; // Приходит из Provider через WithRestoService
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))  // Вызываем action creator, который пришел сюда благодяря ф-ции connect и как аргумент передаем результат запроса на сервер. Выключает Spinner
            .catch(() => this.props.menuError());
    }
    
    render() {
        const {menuItems, loading, error, addedToCart} = this.props; // Приходит из store, благодаря mapStateToProps

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        const content = menuItems.map(menuItem => {
            return <MenuListItem
                        key={menuItem.id}
                        menuItem={menuItem}
                        onAddToCart={() => addedToCart(menuItem.id)}/>
        });

        return (
            <View content={content}/>
        );
    }
};

const View = ({content}) => {
    return (
        <ul className="menu__list">
            {content}
        </ul>
    )
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,  // menuItems и loading придут в виде пропосов в компонент MenuList в нём будет массив menu и loading из state из reducer
        loading: state.loading,
        error: state.error
    }
};

const mapDispathToProps =  {
    menuLoaded, // Action creator (обьект с type и playload), который пойдет в reducer, как аргумент action`a
    menuRequested,
    menuError,
    addedToCart
};


export default WithRestoService()(connect(mapStateToProps, mapDispathToProps)(MenuList)); // Получили данные из store, чтобы передать их как пропсы через connect, из MenuList оправили данные в store. Добавили контекст с помощью WithRestoService