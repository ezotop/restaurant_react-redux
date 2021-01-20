import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './app-header.scss';

const TotalPrice = ({orderedItems}) => {
    let total = 0;

    orderedItems.map(item => {
        if (item) {
            total += item.qty * item.price;
        }
        return 0;
    });

    return (
        <>
            Total: {total} $
        </>
    ) 
};

const AppHeader = ({orderedItems}) => {

    // let total = 0;

    // orderedItems.map(item => {
    //     if (item) {
    //         total += item.qty * item.price;
    //     }
    //     return 0;
    // });

    return (
        <header className="header">
            <Link className="header__link" to="/">
                Menu
            </Link>
            <Link className="header__link" to="/cart">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                <TotalPrice orderedItems={orderedItems}/>
            </Link>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        orderedItems: state.items
    }
};

export default connect(mapStateToProps)(AppHeader);