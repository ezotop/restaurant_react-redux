import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Error from '../error';
import Spinner from '../spinner';

class ItemPage extends Component {

    componentDidMount() {
        this.props.menuRequested();
        this.props.RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError());
    }

    render() {
        const {loading, error, addedToCart} = this.props;
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id);
        const{title, url, category, price, descr, id} = item;
        
        return (
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '20px'}}>
                <div className="menu__item">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category:
                        <div className={`menu__category_img ${category}`}></div>
                        <span>{category}</span>
                    </div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <button onClick={() => addedToCart(id)} className="menu__btn">Add to cart</button>
                </div>
                <div className="menu__item menu__item_descr">{descr}</div>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispathToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispathToProps)(ItemPage));