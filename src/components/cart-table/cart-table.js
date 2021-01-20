import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, changeQuantity, incQty, decQty} from '../../actions';
import WithRestoService from '../hoc';
import './cart-table.scss';

const CartTable = ({items, deleteFromCart, changeQuantity, incQty, decQty, RestoService}) => {

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        if (item) {
                            const {title, url, price, id, qty} = item;

                            return (
                                    <div className="cart__item" key={id}>
                                        <img className="cart__item-img" src={url} alt={title}></img>
                                        <div className="cart__item-title">{title}</div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div>
                                                <div
                                                    className="chevron chevron_up"
                                                    onClick={() => incQty(id)}></div>
                                                <input
                                                    onChange={(e) => changeQuantity(id, e.target.value)}
                                                    type="text"
                                                    placeholder={qty}
                                                    className="cart__item-qty"/>
                                                <div
                                                    className="chevron chevron_down"
                                                    onClick={() => decQty(id)}></div>
                                            </div>
                                            <div className="cart__item-price">{price}$</div>
                                        </div>
                                        
                                        <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                                    </div>
                            )
                        }
                        return false
                    })
                }
            </div>
            <div className="cart__list">
                <button className="cart__order-btn" onClick={() => {RestoService.postData(generateOrder(items))}}>Order</button>
            </div>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            title: item.title,
            dishId: item.id,
            price: item.price,
            qty: item.qty,
            totalItemPrice: item.qty * item.price
        }
    })
    return newOrder;
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
};

const mapDispatchToProps = { // Если нужно просто создать какой-то метод, который будет просто выполняться и передать его, то нужно указать mapDispatchtoProps, как стрелочную функцию
    deleteFromCart,
    changeQuantity,
    incQty,
    decQty
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));